import { useSelector } from "react-redux";
import { Card } from "@/components/ui/card";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from "chart.js";
import dayjs from "dayjs";

ChartJS.register(BarElement, CategoryScale, LinearScale);

function AdminRevenuePage() {
  const { orderList } = useSelector((state) => state.adminOrder);

  // Tổng doanh thu
  const totalRevenue = orderList?.reduce(
    (sum, order) => sum + (order.totalAmount || 0),
    0
  ) || 0;

  // Tổng đơn hôm nay
  const today = dayjs().startOf("day");
  const ordersToday = orderList?.filter(order => dayjs(order.orderDate).isAfter(today)) || [];
  const totalOrdersToday = ordersToday.length;

  // Bỏ totalViews, conversionRate chỉ để mặc định = 0 hoặc không cần

  // Đếm theo trạng thái
  const countByStatus = (status) =>
    orderList?.filter((order) => order.orderStatus === status).length || 0;

  const pendingOrders = countByStatus("Chờ xác nhận");
  const confirmedOrders = countByStatus("Đã xác nhận");
  const shippingOrders = countByStatus("Đang giao hàng");
  const deliveredOrders = countByStatus("Đã giao");

  // Doanh thu theo tháng
  const revenueByMonth = Array(12).fill(0);

  orderList?.forEach(order => {
    const month = dayjs(order.orderDate).month();
    revenueByMonth[month] += order.totalAmount || 0;
  });

  const months = ["Th1", "Th2", "Th3", "Th4", "Th5", "Th6", "Th7", "Th8", "Th9", "Th10", "Th11", "Th12"];

  const chartData = {
    labels: months,
    datasets: [
      {
        label: "Doanh thu (triệu VNĐ)",
        data: revenueByMonth.map(val => (val / 1_000_000).toFixed(2)),
        backgroundColor: "#4ade80",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    scales: {
      y: { beginAtZero: true },
    },
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Tổng Quan Doanh Thu</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* CHỈ còn 3 ô tổng quan, không còn ô Lượt xem hôm nay */}
        <Card className="p-4">
          <div className="text-sm text-muted-foreground mb-1">Tổng doanh thu</div>
          <div className="text-xl font-bold">{totalRevenue.toLocaleString('vi-VN')} VNĐ</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-muted-foreground mb-1">Tổng đơn hàng hôm nay</div>
          <div className="text-xl font-bold">{totalOrdersToday}</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-muted-foreground mb-1">Tỷ lệ chuyển đổi</div>
          <div className="text-xl font-bold">0%</div> {/* hoặc bạn bỏ hẳn luôn */}
        </Card>
      </div>

      <Card className="p-4">
        <h2 className="text-lg font-semibold mb-4">Biểu đồ doanh thu theo tháng</h2>
        <Bar data={chartData} options={chartOptions} />
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="text-sm text-muted-foreground mb-1">Chờ xác nhận</div>
          <div className="text-xl font-bold">{pendingOrders}</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-muted-foreground mb-1">Đã xác nhận</div>
          <div className="text-xl font-bold">{confirmedOrders}</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-muted-foreground mb-1">Đang giao hàng</div>
          <div className="text-xl font-bold">{shippingOrders}</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-muted-foreground mb-1">Đã giao</div>
          <div className="text-xl font-bold">{deliveredOrders}</div>
        </Card>
      </div>
    </div>
  );
}

export default AdminRevenuePage;
