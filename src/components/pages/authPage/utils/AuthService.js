import api from "./AxiosInstance";

export const refreshAccessToken = async () => {
  try {
    const { data } = await api.post("/auth/refresh");
    localStorage.setItem("accessToken", data.accessToken);
    return data.accessToken;
  } catch(error) {
    console.warn("Refresh failed—keeping existing accessToken:", error);
    return null;
  }
};
