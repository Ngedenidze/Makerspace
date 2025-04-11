import axios from "axios";

const apiBaseUrl = process.env.REACT_APP_API_URL; 

export const refreshAccessToken = async () => {
  try {
    const res = await axios.post(`${apiBaseUrl}/api/Auth/refresh`, null, {
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