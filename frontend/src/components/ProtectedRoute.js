import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const getUser = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    if (decoded.exp * 1000 < Date.now()) return null;
    return decoded;
  } catch {
    return null;
  }
};

export default function ProtectedRoute({ roles }) {
  const user = getUser();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/forbidden" replace />;
  }

  return <Outlet />;
}
