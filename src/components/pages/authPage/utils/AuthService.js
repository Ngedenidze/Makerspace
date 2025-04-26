import api from "./AxiosInstance";

export const refreshAccessToken = async () => {
  try {
    const { data } = await api.post("/auth/refresh");
    localStorage.setItem("accessToken", data.accessToken);
    return data.accessToken;
  } catch {
    localStorage.removeItem("accessToken");
    return null;
  }
};
