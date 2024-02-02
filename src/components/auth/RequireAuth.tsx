// import useAuthStore from '@src/store/AuthProvier';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const RequireAuth = () => {
  // const accessToken = useAuthStore((state) => state.accessToken);
  const accessToken = localStorage.getItem('accessToken');
  const location = useLocation();

  return accessToken ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
