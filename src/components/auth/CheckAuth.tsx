import { Navigate, Outlet, useLocation } from 'react-router-dom';

const CheckAuth = () => {
  const accessToken = localStorage.getItem('accessToken');
  const location = useLocation();

  return location.pathname === '/' ? (
    accessToken ? (
      <Navigate to={'/my/dashboard/containers'} />
    ) : (
      <Navigate to={'/login'} />
    )
  ) : (
    <Outlet />
  );
};

export default CheckAuth;
