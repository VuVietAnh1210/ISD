import { LogOut, Menu, ShoppingCart, UserCog, Search, Bell } from "lucide-react"
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom"
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet"
import { Button } from "../ui/button"
import { useDispatch, useSelector } from "react-redux"
import { shoppingViewHeaderMenuItems } from "@/config"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { Avatar, AvatarFallback } from "../ui/avatar"
import { logoutUser } from "@/store/auth-slice"
import UserCartWrapper from "./cart-wrapper"
import { useEffect, useState, useRef } from "react"
import { fetchCartItems } from "@/store/shop/cart-slice"
import { Label } from "../ui/label"

import logoThuHan from '../../assets/logo-thu-han.png';

// --- Các component MenuItems và HeaderRightContent giữ nguyên như cũ ---

function MenuItems() {
  const navigate = useNavigate()
  const location = useLocation()
  const [searchParams, setSearchParams] = useSearchParams()
  const headerRef = useRef(null)

  function handleNavigate(getCurrentMenuItem) {
    sessionStorage.removeItem("filters")
    const currentFilter =
      getCurrentMenuItem.id !== "home" && getCurrentMenuItem.id !== "products" && getCurrentMenuItem.id !== "search"
        ? {
            category: [getCurrentMenuItem.id],
          }
        : null

    sessionStorage.setItem("filters", JSON.stringify(currentFilter))

    // Xử lý điều hướng
    if (location.pathname.includes("listing") && currentFilter !== null) {
      setSearchParams(new URLSearchParams(`?category=${getCurrentMenuItem.id}`))
      // Cuộn lên đầu trang khi thay đổi bộ lọc
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    } else {
      // Điều hướng đến trang mới
      navigate(getCurrentMenuItem.path)

      // Cuộn trang lên đúng vị trí (dưới header)
      setTimeout(() => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        })
      }, 100)
    }
  }

  return (
      <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row">
        {shoppingViewHeaderMenuItems.map((menuItem) => (
            <Label
                onClick={() => handleNavigate(menuItem)}
                className={`text-lg font-medium cursor-pointer hover:text-primary transition-colors ${
                  location.pathname.includes(menuItem.path.split("/").pop()) ? "text-primary font-bold" : ""
                }`}
                key={menuItem.id}
            >
              {menuItem.label}
            </Label>
        ))}
      </nav>
  )
}

function HeaderRightContent() {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const [openCartSheet, setOpenCartSheet] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logoutUser());
  }

  useEffect(() => {
    if (user?.id) dispatch(fetchCartItems(user?.id));
  }, [dispatch, user?.id]);

  // ✅ Nếu chưa đăng nhập thì hiện 2 nút:
  if (!isAuthenticated) {
    return (
      <div className="flex items-center gap-4">
        <Link to="/auth/login">
          <Button className="bg-black text-white hover:bg-zinc-800">Đăng nhập</Button>
        </Link>
        <Link to="/auth/register">
          <Button variant="outline" className="border-black text-black hover:bg-zinc-100">
            Đăng ký
          </Button>
        </Link>
      </div>
    );
  }

  // ✅ Nếu đã đăng nhập thì hiện icon cũ
  return (
    <div className="relative flex lg:items-center lg:flex-row flex-col gap-4 lg:-translate-x-10">
      <Button onClick={() => navigate("/shop/search")} variant="text" size="icon">
        <Search className="w-28 h-28" />
        <span className="sr-only">Search</span>
      </Button>

      <Button variant="text" size="icon">
        <Bell className="w-28 h-28" />
        <span className="sr-only">Notifications</span>
      </Button>

      <Sheet open={openCartSheet} onOpenChange={() => setOpenCartSheet(false)}>
        <Button onClick={() => setOpenCartSheet(true)} variant="text" size="icon" className="relative">
          <ShoppingCart className="w-28 h-28" />
          <span className="absolute -top-2 -right-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white">{cartItems?.items?.length || 0}</span>
          <span className="sr-only">User cart</span>
        </Button>
        <UserCartWrapper
          setOpenCartSheet={setOpenCartSheet}
          cartItems={cartItems && cartItems.items && cartItems.items.length > 0 ? cartItems.items : []}
        />
      </Sheet>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="bg-black cursor-pointer w-16 h-16">
            <AvatarFallback className="bg-black text-white font-extrabold text-xl">
              {user?.userName ? user.userName[0].toUpperCase() : "U"}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" className="w-56">
          <DropdownMenuLabel>Đăng nhập bởi '{user?.userName || "User"}'</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => navigate("/shop/account")}>
            <UserCog className="mr-2 h-4 w-4" />
            Tài khoản
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Đăng xuất
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}



// --- Component ShoppingHeader với logo đã được chỉnh sửa ---
function ShoppingHeader() {
  const { isAuthenticated } = useSelector((state) => state.auth)
  const headerRef = useRef(null)
  const [headerHeight, setHeaderHeight] = useState(64) // Mặc định 64px (h-16)

  useEffect(() => {
    // Lấy chiều cao thực tế của header
    if (headerRef.current) {
      const height = headerRef.current.offsetHeight
      setHeaderHeight(height)

      // Cập nhật biến CSS để sử dụng trong toàn bộ ứng dụng
      document.documentElement.style.setProperty("--header-height", `${height}px`)
    }

    // Thêm padding-top cho main content
    const mainContent = document.querySelector("main")
    if (mainContent) {
      mainContent.style.paddingTop = `${headerHeight}px`
    }
  }, [headerHeight]) // Chỉ chạy lại khi headerHeight thay đổi (thường chỉ 1 lần đầu)

  return (
      <header
          ref={headerRef}
          className="fixed top-0 left-0 right-0 z-50 w-full border-b bg-background/95 backdrop-blur-sm shadow-sm"
      >
        <div className="flex h-auto items-center justify-between px-4 md:px-6 py-1"> {/* Đổi h-16 thành h-auto và thêm py-1 */}
          <Link to="/shop/home" className="flex items-center gap-2">
            <img
                src={logoThuHan}
                alt="Thu Han Logo"
                // Thay đổi class ở đây: ví dụ từ h-14 thành h-20
                className="h-20 w-auto"
            />
          </Link>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="lg:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle header menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-full max-w-xs">
              <MenuItems />
              <HeaderRightContent />
            </SheetContent>
          </Sheet>
          <div className="hidden lg:block">
            <MenuItems />
          </div>

          <div className="hidden lg:block">
            <HeaderRightContent />
          </div>
        </div>
      </header>
  )
}

export default ShoppingHeader