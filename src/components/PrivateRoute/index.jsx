import { Navigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return null;

  if (!Object.keys(user).length) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
