import axios from "axios";

const apiUrl =
  process.env.NODE_ENV === "production"
    ? "https://makerspace-cffwdbazgbh3ftdq.westeurope-01.azurewebsites.net"
    : "";

export const refreshAccessToken = async () => {
  try {
    const res = await axios.post(`${apiUrl}/api/auth/refresh`, null, {
      withCredentials: true, // Required to send the cookie
    });

    const newAccessToken = res.data.accessToken;
    localStorage.setItem("accessToken", newAccessToken);
    return newAccessToken;
  } catch (err) {
    console.error("Refresh failed:", err.response?.data || err.message);
    localStorage.removeItem("accessToken");
    return null;
  }
};