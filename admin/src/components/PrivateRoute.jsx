import { Navigate, Outlet } from "react-router-dom";
import { toast } from "react-toastify";

// display provate components only if user is loged in
const PrivateRoute = () => {
  const auth = localStorage.getItem("user");

  if (!auth) {
    toast.error("You are Not Logged In");
  }

  // navigate to login route if user is not loged in
  return auth ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
