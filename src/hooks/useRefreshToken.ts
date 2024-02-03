// import useAuthStore from '@src/store/AuthProvier';
import { axiosPublic } from '@src/api/axios';

const useRefreshToken = () => {
  // const setAccessToken = useAuthStore((state) => state.setAccessToken);

  const refresh = async () => {
    const response = await axiosPublic.get('/hello', {
      withCredentials: true,
    });

    console.log('refresh에 대한 응답', response.headers);

    // setAccessToken(response.headers.NewAccessToken);
    localStorage.setItem('accessToken', response.headers.NewAccessToken);
    return response.headers.NewAccessToken;
  };
  return refresh;
};

export default useRefreshToken;
