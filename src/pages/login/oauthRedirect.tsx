import { FC, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Oauth2RedirectHandler: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const getTokenFromUrl = (): string | null => {
      return new URLSearchParams(location.search).get('token');
    };
    const accessToken = getTokenFromUrl();
    if (accessToken) {
      console.log('JWT Token:', accessToken);
      localStorage.setItem('accessToken', accessToken);
      // navigate('/');
    } else {
      // navigate('/login');
    }
  }, [navigate, location]);
  return <div>로그인 처리중...</div>;
};

export default Oauth2RedirectHandler;
