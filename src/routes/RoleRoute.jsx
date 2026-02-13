import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";

const RoleRoute = ({ children, allowedRoles }) => {
  const { user } = useAuth();

  if (!allowedRoles.includes(user?.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RoleRoute;
