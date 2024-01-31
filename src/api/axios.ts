import useAuthStore from "@src/store/AuthProvier";
import axios from "axios";

const BASE_URL = "http://localhost:8080";

// Without Token
export const axiosApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// With Token
export const axiosAuth = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

axiosAuth.interceptors.request.use(
  (config) => {
    const isUserValid = useAuthStore((state) => state.isUserValid);

    if (isUserValid) {
      config.headers.Authorization = localStorage.getItem("accessToken");
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
