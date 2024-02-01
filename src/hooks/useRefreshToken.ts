import { axiosPublic } from "@src/api/axios";
import useAuthStore from "@src/store/AuthProvier";

const useRefreshToken = () => {
  const setAccessToken = useAuthStore((state) => state.setAccessToken);

  const refresh = async () => {
    const response = await axiosPublic.get("/refresh", {
      withCredentials: true,
    });
    setAccessToken(response.headers.NewAccessToken);
    return response.headers.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
