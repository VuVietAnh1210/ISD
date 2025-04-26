import { Navigate, useLocation } from "react-router-dom";

function CheckAuth({ isAuthenticated, user, children }) {
  const location = useLocation();

  console.log(location.pathname, isAuthenticated);

  // ✅ Redirect từ "/" theo vai trò hoặc mặc định
  if (location.pathname === "/") {
    if (isAuthenticated) {
      if (user?.role === "admin") {
        return <Navigate to="/admin/dashboard" />;
      } else {
        return <Navigate to="/shop/home" />;
      }
    } else {
      // Mặc định redirect tới /shop/home dù chưa đăng nhập
      return <Navigate to="/shop/home" />;
    }
  }

  // ✅ Cho phép truy cập các trang public kể cả chưa đăng nhập
  const publicPaths = ["/auth/login", "/auth/register", "/shop/home"];

  if (!isAuthenticated && !publicPaths.some((path) => location.pathname.startsWith(path))) {
    return <Navigate to="/auth/login" />;
  }

  // ✅ Nếu đã đăng nhập mà vào login/register thì redirect ra ngoài
  if (
    isAuthenticated &&
    (location.pathname.includes("/login") ||
      location.pathname.includes("/register"))
  ) {
    if (user?.role === "admin") {
      return <Navigate to="/admin/dashboard" />;
    } else {
      return <Navigate to="/shop/home" />;
    }
  }

  // ✅ User không phải admin nhưng vào trang admin
  if (
    isAuthenticated &&
    user?.role !== "admin" &&
    location.pathname.includes("admin")
  ) {
    return <Navigate to="/unauth-page" />;
  }

  // ✅ Admin mà truy cập vào route của shop
  if (
    isAuthenticated &&
    user?.role === "admin" &&
    location.pathname.includes("shop")
  ) {
    return <Navigate to="/admin/dashboard" />;
  }

  return <>{children}</>;
}

export default CheckAuth;
