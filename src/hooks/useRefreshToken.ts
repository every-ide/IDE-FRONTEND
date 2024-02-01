import { axiosPublic } from "@src/api/axios";
import useAuthStore from "@src/store/AuthProvier";

const useRefreshToken = () => {
  const setAccessToken = useAuthStore((state) => state.setAccessToken);

  const refresh = async () => {
    const response = await axiosPublic.get("/refresh", {
      withCredentials: true,
    });

    setAccessToken(response.headers.newaccesstoken);
    return response.headers.newaccesstoken;
  };
  return refresh;
};

export default useRefreshToken;
