import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// axios instance WITHOUT accessToken
export const axiosPublic = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// axios instance WITH accessToken
// 주의 : server request시 'useAxiosPrivate' hook을 사용해주세요.
// (request & response interceptor, refreshToken 로직)
export const axiosAuth = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});
