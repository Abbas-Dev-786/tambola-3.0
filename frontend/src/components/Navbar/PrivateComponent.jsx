import { Navigate, Outlet } from "react-router-dom";

// display provate components only if user is loged in
const PrivateRoute = () => {
  const auth = localStorage.getItem("user");
  // navigate to login route if user is not loged in
  return auth ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
