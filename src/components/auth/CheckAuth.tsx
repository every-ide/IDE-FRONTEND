import { Navigate, Outlet, useLocation } from "react-router-dom";

const CheckAuth = () => {
  const location = useLocation();

  return location.pathname === "/" ? <Navigate to={"/login"} /> : <Outlet />;
};

export default CheckAuth;
