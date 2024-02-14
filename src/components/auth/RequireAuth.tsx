import { axiosPublic } from '@/src/api/axios';
import useAxiosPrivate from '@/src/hooks/useAxiosPrivate';
import { useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useUserStore from '@/src/store/useUserStore';

const RequireAuth = () => {
  const axiosPrivate = useAxiosPrivate();
  const setUser = useUserStore((state) => state.setUser);
  const accessToken = localStorage.getItem('accessToken');
  const location = useLocation();

  const fetchUserInfo = async () => {
    if (!accessToken) {
      console.log('No access token available');
      return;
    }

    try {
      const response = await axiosPrivate.get('/user/info');
      if (response.status === 200) {
        const { email, name, userId } = response.data;
        setUser({ email, name, userId });
      } else {
        // 200이 아닌 다른 상태 코드 처리
        console.error('예상치 못한 응답 상태 코드:', response.status);
        // 추가적인 에러 핸들링 로직, 예: 사용자를 오류 페이지로 리다이렉트
      }
    } catch (err) {
      // 필요한 경우 사용자를 로그인 페이지로 리다이렉트
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, [accessToken]);

  return accessToken ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
