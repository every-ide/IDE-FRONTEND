import useAuthStore from "@src/store/AuthProvier";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const CheckAuth = () => {
  const accessToken = useAuthStore((state) => state.accessToken);
  const location = useLocation();
  console.log("location", location.pathname);
  return accessToken !== null ? (
    <Navigate
      to="/my/dashboard/containers"
      state={{ from: location }}
      replace
    />
  ) : location.pathname === "/" ? (
    <Navigate to={"/login"} />
  ) : (
    <Outlet />
  );
};

export default CheckAuth;
