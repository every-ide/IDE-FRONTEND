import useAuthStore from '../store/AuthProvier';
import useAxiosPrivate from './useAxiosPrivate';

const useUserAPI = () => {
  const axiosAuth = useAxiosPrivate();
  const { userId, userEmail, setUserInfo } = useAuthStore();

  const getUserInfo = async () => {
    // store에 값이 있으면 그대로 return
    if (userId && userEmail) {
      return { userId, userEmail };
    } else {
      // store 값이 하나라도 null일 경우, 유저 정보 재요청
      const response = await axiosAuth.get('/user/info');

      if (response.status === 200) {
        //zustand 저장
        setUserInfo(response.data.userId, response.data.email);

        return {
          userId: response.data.userId,
          userEmail: response.data.email,
        };
      }
    }
  };

  return getUserInfo;
};

export default useUserAPI;
