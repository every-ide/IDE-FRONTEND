import { axiosPublic } from '@/src/api/axios';

const useRefreshToken = () => {
  const refresh = async () => {
    const response = await axiosPublic.get('/hello', {
      withCredentials: true,
    });

    console.log('refresh에 대한 응답', response.headers);

    localStorage.setItem('accessToken', response.headers.NewAccessToken);
    return response.headers.NewAccessToken;
  };
  return refresh;
};

export default useRefreshToken;
