import { useState } from "react";
import CommonForm from "../common/form";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersForAdmin,
  getOrderDetailsForAdmin,
  updateOrderStatus,
} from "@/store/admin/order-slice";
import { useToast } from "../ui/use-toast";

const initialFormData = {
  status: "",
};

// Định nghĩa ánh xạ màu sắc cho trạng thái
const statusColors = {
  "Chờ xác nhận": "bg-yellow-500 hover:bg-yellow-600", // Màu vàng
  "Đã xác nhận": "bg-orange-500 hover:bg-orange-600", // Màu cam
  "Đang giao hàng": "bg-blue-500 hover:bg-blue-600", // Màu xanh dương
  "Đã giao": "bg-green-500 hover:bg-green-600", // Màu xanh lá
  // Thêm các trạng thái khác nếu có
};
const defaultColor = "bg-black hover:bg-gray-700"; // Màu mặc định nếu không khớp

function AdminOrderDetailsView({ orderDetails }) {
  const [formData, setFormData] = useState(initialFormData);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { toast } = useToast();

  console.log(orderDetails, "orderDetailsorderDetails");

  function handleUpdateStatus(event) {
    event.preventDefault();
    const { status } = formData;

    dispatch(
      updateOrderStatus({ id: orderDetails?._id, orderStatus: status })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(getOrderDetailsForAdmin(orderDetails?._id));
        dispatch(getAllOrdersForAdmin());
        setFormData(initialFormData);
        toast({
          title: data?.payload?.message,
        });
      }
    });
  }

  // Lấy lớp màu tương ứng với trạng thái hiện tại
  const badgeColor = statusColors[orderDetails?.orderStatus] || defaultColor;


  return (
    <DialogContent className="sm:max-w-[600px]">
      <div className="grid gap-2">
        <div className="grid gap-2">
          <div className="flex mt-6 items-center justify-between">
            <p className="font-medium">Mã đơn hàng</p>
            <Label>{orderDetails?._id}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Ngày đặt hàng</p>
            <Label>{orderDetails?.orderDate.split("T")[0]}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Giá đơn hàng</p>
            <Label>{orderDetails?.totalAmount?.toLocaleString('vi-VN')} VNĐ</Label>
          </div>
          {/* <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Payment method</p>
            <Label>{orderDetails?.paymentMethod}</Label>
          </div> */}
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Trạng thái thanh toán</p>
            <Label>{orderDetails?.paymentStatus}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Trạng thái đơn hàng</p>
            <Label>
              {/* ---- THAY ĐỔI Ở ĐÂY ---- */}
              <Badge
                className={`py-1 px-3 text-white ${badgeColor}`} // Sử dụng biến badgeColor, thêm text-white
              >
                {orderDetails?.orderStatus}
              </Badge>
              {/* ---- KẾT THÚC THAY ĐỔI ---- */}
            </Label>
          </div>
        </div>
        <Separator />
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium">Chi tiết sản phẩm</div>
            <ul className="grid gap-3">
              {orderDetails?.cartItems && orderDetails?.cartItems.length > 0
                ? orderDetails?.cartItems.map((item) => (
                    <li key={item._id} className="flex items-center justify-between text-sm"> {/* Thêm key và text-sm */}
                      <span>{item.title}</span> {/* Bỏ "Tên sản phẩm:" */}
                      <span>SL: {item.quantity}</span> {/* Viết tắt "Số lượng:" */}
                      <span>{item.price?.toLocaleString('vi-VN')} VNĐ</span> {/* Bỏ "Giá sản phẩm:" */}
                    </li>
                  ))
                : null}
            </ul>
          </div>
        </div>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium">Thông tin vận chuyển</div>
            <div className="grid gap-0.5 text-muted-foreground">
              <span>Tên: {user.userName}</span>
              <span>Địa chỉ: {orderDetails?.addressInfo?.address}</span>
              <span>Thành phố: {orderDetails?.addressInfo?.city}</span>
              <span>Số điện thoại: {orderDetails?.addressInfo?.phone}</span>
              <span>Ghi chú: {orderDetails?.addressInfo?.notes}</span>
            </div>
          </div>
        </div>

        <div>
          <CommonForm
            formControls={[
              {
                label: "Trạng thái đơn hàng",
                name: "status",
                componentType: "select",
                options: [
                  { id: "Chờ xác nhận", label: "Chờ xác nhận" },
                  { id: "Đã xác nhận", label: "Đã xác nhận" },
                  { id: "Đang giao hàng", label: "Đang giao hàng" },
                  { id: "Đã giao", label: "Đã giao" },
                ],
              },
            ]}
            formData={formData}
            setFormData={setFormData}
            buttonText={"Cập nhật trạng thái đơn hàng"}
            onSubmit={handleUpdateStatus}
          />
        </div>
      </div>
    </DialogContent>
  );
}

export default AdminOrderDetailsView;