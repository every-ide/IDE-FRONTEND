import { axiosPublic } from "@src/api/axios";
import useAuthStore from "@src/store/AuthProvier";

const useRefreshToken = () => {
  const setAccessToken = useAuthStore((state) => state.setAccessToken);

  const refresh = async () => {
    const response = await axiosPublic.get("/refresh", {
      withCredentials: true,
    });

    // 403
    console.log("refresh에 대한 응답", response.data.NewAccessToken);
    setAccessToken(response.data.NewAccessToken);
    return response.data.NewAccessToken;
  };
  return refresh;
};

export default useRefreshToken;
