import { useSelector } from "react-redux";
import { Card } from "@/components/ui/card";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale);

function AdminRevenuePage() {
  const { orderList } = useSelector((state) => state.adminOrder);

  const totalRevenue = orderList?.reduce(
    (sum, order) => sum + (order.totalAmount || 0),
    0
  );
  const totalOrders = orderList?.length || 0;
  const totalViews = 11000;
  const conversionRate = totalOrders && totalViews ? ((totalOrders / totalViews) * 100).toFixed(2) : 0;

  // Dữ liệu giả lập cho biểu đồ
  const revenueByMonth = [120, 160, 200, 180, 250, 210, 300, 280, 320, 290, 400, 380]; // triệu
  const months = ["Th1", "Th2", "Th3", "Th4", "Th5", "Th6", "Th7", "Th8", "Th9", "Th10", "Th11", "Th12"];

  const chartData = {
    labels: months,
    datasets: [
      {
        label: "Doanh thu (triệu VNĐ)",
        data: revenueByMonth,
        backgroundColor: "#4ade80",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Tổng Quan Doanh Thu</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="text-sm text-muted-foreground mb-1">Tổng doanh thu</div>
          <div className="text-xl font-bold">{totalRevenue.toLocaleString('vi-VN')} VNĐ</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-muted-foreground mb-1">Tổng đơn hàng</div>
          <div className="text-xl font-bold">{totalOrders}</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-muted-foreground mb-1">Tỷ lệ chuyển đổi</div>
          <div className="text-xl font-bold">{conversionRate}%</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-muted-foreground mb-1">Lượt xem hôm nay</div>
          <div className="text-xl font-bold">11,000</div>
        </Card>
      </div>

      <Card className="p-4">
        <h2 className="text-lg font-semibold mb-4">Biểu đồ doanh thu theo tháng</h2>
        <Bar data={chartData} options={chartOptions} />
      </Card>
    </div>
  );
}

export default AdminRevenuePage;
