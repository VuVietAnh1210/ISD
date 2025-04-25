import {
  BadgeCheck,
  ChartNoAxesCombined,
  LayoutDashboard,
  ShoppingBasket,
} from "lucide-react";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import logoThuHan from '../../assets/logo-thu-han.png';


const adminSidebarMenuItems = [
  {
    id: "dashboard",
    label: "Đơn hàng",
    path: "/admin/dashboard",
    icon: <LayoutDashboard />,
  },
  {
    id: "products",
    label: "Sản phẩm",
    path: "/admin/products",
    icon: <ShoppingBasket />,
  },
  {
    id: "orders",
    label: "Lịch sử đặt hàng",
    path: "/admin/orders",
    icon: <BadgeCheck />,
  },
  {
    id: "revenue",
    label: "Doanh thu",
    path: "/admin/revenue",
    icon: <ChartNoAxesCombined />,
  },
];

function MenuItems({ setOpen }) {
  const navigate = useNavigate();

  return (
    <nav className="mt-8 flex-col flex gap-2">
      {adminSidebarMenuItems.map((menuItem) => (
        <div
          key={menuItem.id}
          onClick={() => {
            navigate(menuItem.path);
            setOpen ? setOpen(false) : null;
          }}
          className="flex cursor-pointer text-xl items-center gap-2 rounded-md px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          {menuItem.icon}
          <span>{menuItem.label}</span>
        </div>
      ))}
    </nav>
  );
}

function AdminSideBar({ open, setOpen }) {
  const navigate = useNavigate();

  return (
    <Fragment>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-64">
          <div className="flex flex-col h-full">
            <SheetHeader className="border-b">
              <SheetTitle className="flex items-center justify-center mt-4 mb-4">
                <img
                  src={logoThuHan}
                  alt="Logo Trang chủ"
                  className="h-30 w-auto cursor-pointer" 
                  onClick={() => {
                     navigate("/admin/dashboard"); 
                     if (setOpen) setOpen(false); 
                  }}
                />
              </SheetTitle>
            </SheetHeader>
            <MenuItems setOpen={setOpen} />
          </div>
        </SheetContent>
      </Sheet>
      <aside className="hidden w-64 flex-col border-r bg-background p-6 lg:flex">
        {/* --- ĐÃ SỬA Ở ĐÂY (ASIDE) --- */}
        <div
          onClick={() => navigate("/admin/dashboard")} // Giả sử navigate đã được định nghĩa
          className="flex cursor-pointer items-center justify-center mb-6"
        >
          <img
            src={logoThuHan} 
            alt="Logo Trang chủ"
            className="h-30 w-auto" 
          />
        </div>
        {/* --- KẾT THÚC SỬA (ASIDE) --- */}
        <MenuItems />
      </aside>
    </Fragment>
  );
}

export default AdminSideBar;
