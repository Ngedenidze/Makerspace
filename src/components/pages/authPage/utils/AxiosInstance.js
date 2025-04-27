// authPage/utils/AxiosInstance.js
import axios from "axios";
import { refreshAccessToken } from "./AuthService";

const apiBaseUrl =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_API_URL
    : "";

const api = axios.create({
  baseURL: `${apiBaseUrl}/api`,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
api.interceptors.response.use(
  response => response,
  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;
    const token = localStorage.getItem("accessToken");

    // If it's a 401 on login or refresh endpoints, just reject
    if (
      status === 401 &&
      (originalRequest.url.includes("/auth/login") ||
       originalRequest.url.includes("/auth/refresh"))
    ) {
      return Promise.reject(error);
    }

    // If 401 and there's no accessToken in localStorage, kick to login
    if (status === 401 && !token) {
      window.location.href = "/login";
      return Promise.reject(error);
    }

    // If 401 and we *do* have a token and we haven't retried yet → try refresh
    if (status === 401 && token && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const newToken = await refreshAccessToken();
        if (newToken) {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        console.error("refresh failed", refreshError);
      }
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);


export default api;