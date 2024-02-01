import { axiosPublic } from "@src/api/axios";
import useAuthStore from "@src/store/AuthProvier";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const useRefreshToken = () => {
  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const navigate = useNavigate();

  const refresh = async () => {
    try {
      // Token Refresh 요청
      const response = await axiosPublic.get("/refresh", {
        withCredentials: true,
      });
      console.log(response.headers.newaccesstoken);

      setAccessToken(response.headers.newaccesstoken);
      return response.headers.newaccesstoken;
    } catch (err: any) {
      console.error(err);
      // 로그아웃!
      if (err.response.statusCode === 403) {
        navigate("/login");
        toast.error("로그인이 만료되었습니다.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          theme: "dark",
        });
      }
    }
  };
  return refresh;
};

export default useRefreshToken;
