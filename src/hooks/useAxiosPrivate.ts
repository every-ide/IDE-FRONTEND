import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import { axiosAuth } from "@src/api/axios";
import useAuthStore from "@src/store/AuthProvier";

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const accessToken = useAuthStore((state) => state.accessToken);

  useEffect(() => {
    // 요청 헤더에 acessToken 설정
    const requestIntercept = axiosAuth.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // accessToken 만료시 재발급
    const responseIntercept = axiosAuth.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 401 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axiosAuth(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosAuth.interceptors.request.eject(requestIntercept);
      axiosAuth.interceptors.response.eject(responseIntercept);
    };
  }, [accessToken, refresh]);

  return axiosAuth;
};

export default useAxiosPrivate;
