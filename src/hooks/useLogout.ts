import { axiosPublic } from "@src/api/axios";
import {} from "react-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const useLogout = () => {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      const response = await axiosPublic.get("/logout", {
        withCredentials: true,
      });

      if (response.status === 200) {
        navigate("/login");
        toast("👾 안전하게 로그아웃되었습니다 👾", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          theme: "dark",
        });
      }
    } catch (err) {
      //error
    }
  };

  return logout;
};

export default useLogout;
