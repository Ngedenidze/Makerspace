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
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      originalRequest.url.includes("/auth/login")
    ) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      console.log("Old token:", localStorage.getItem("accessToken"));
      try {
        const newToken = await refreshAccessToken();
        if (newToken) {
          console.log("New token received:", newToken);
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return api(originalRequest);
        } else {
          window.location.href = "/login";
        }
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        window.location.href = "/login"; // Redirect to login on refresh failure
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;