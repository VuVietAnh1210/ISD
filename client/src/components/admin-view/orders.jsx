import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Dialog } from "../ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import AdminOrderDetailsView from "./order-details";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersForAdmin,
  getOrderDetailsForAdmin,
  resetOrderDetails,
} from "@/store/admin/order-slice";
import { Badge } from "../ui/badge";

function AdminOrdersView() {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const { orderList, orderDetails } = useSelector((state) => state.adminOrder);
  const dispatch = useDispatch();

  function handleFetchOrderDetails(getId) {
    dispatch(getOrderDetailsForAdmin(getId));
  }

  useEffect(() => {
    dispatch(getAllOrdersForAdmin());
  }, [dispatch]);

  console.log(orderDetails, "orderList");

  useEffect(() => {
    if (orderDetails !== null) setOpenDetailsDialog(true);
  }, [orderDetails]);
  const statusColors = {
    "Chờ xác nhận": "bg-yellow-500 hover:bg-yellow-600",
    "Đã xác nhận": "bg-orange-500 hover:bg-orange-600",
    "Đang giao hàng": "bg-blue-500 hover:bg-blue-600",
    "Đã giao": "bg-green-500 hover:bg-green-600",
    "Đang vận chuyển": "bg-indigo-500 hover:bg-indigo-600",
    "Bị từ chối": "bg-red-600 hover:bg-red-700",
  };
  
  const defaultColor = "bg-black hover:bg-gray-700";
  

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tất cả các đơn hàng</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Mã đơn hàng</TableHead>
              <TableHead>Ngày đặt hàng</TableHead>
              <TableHead>Giá đơn hàng</TableHead>
              <TableHead>Trạng thái đơn hàng</TableHead>
              <TableHead>
                <span className="sr-only">Chi tiết</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orderList && orderList.length > 0
              ? orderList.map((orderItem) => (
                  <TableRow>
                    <TableCell>{orderItem?._id}</TableCell>
                    <TableCell>{orderItem?.orderDate.split("T")[0]}</TableCell>
                    <TableCell>{orderItem?.totalAmount?.toLocaleString('vi-VN')} VNĐ</TableCell>

                    <TableCell>
  <Badge
    className={`py-1 px-3 text-white ${
      statusColors[orderItem?.orderStatus] || defaultColor
    }`}
  >
    {orderItem?.orderStatus}
  </Badge>
</TableCell>

                    
                    <TableCell>
                      <Dialog
                        open={openDetailsDialog}
                        onOpenChange={() => {
                          setOpenDetailsDialog(false);
                          dispatch(resetOrderDetails());
                        }}
                      >
                        <Button
                          onClick={() =>
                            handleFetchOrderDetails(orderItem?._id)
                          }
                        >
                          Xem chi tiết
                        </Button>
                        <AdminOrderDetailsView orderDetails={orderDetails} />
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default AdminOrdersView;
