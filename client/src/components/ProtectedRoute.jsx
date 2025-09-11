import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export const ProtectedRoute = ({ children, allowedRoles }) => {
  const { authUser } = useAuthStore();

  if (!authUser) return <Navigate to="/login" replace />;

  const userRole = authUser.role?.toUpperCase();

   
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    if (userRole === "ADMIN") return <Navigate to="/admin" replace />;
    if (userRole === "LEAD") return <Navigate to="/lead" replace />;
    return <Navigate to="/user" replace />;
  }

  return children;
};
