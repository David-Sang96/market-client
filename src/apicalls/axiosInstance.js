import axios from "axios";

const getFreshToken = () => localStorage.getItem("token");

export const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_URL}`,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getFreshToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (err) => Promise.reject(err)
);
