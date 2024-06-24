import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../components/AuthProvider";

export const ProtectedRoute = () => {
  //retrieve auth token from the context
  const { token } = useAuth();

  //render outlet if user is authenticated, otherwise send user to login
  return token ? <Outlet /> : <Navigate to="/login" />;
};
