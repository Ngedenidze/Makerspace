import axios from "axios";

const apiBaseUrl = process.env.REACT_APP_API_URL; 

export const refreshAccessToken = async () => {
  try {
    const res = await axios.post(`${apiBaseUrl}/api/Auth/refresh`, null, {
      withCredentials: true,
    });
    console.log("Refresh response data:", res.data); // Log the response
    const newAccessToken = res.data.accessToken;
    localStorage.setItem("accessToken", newAccessToken);
    console.log("New access token saved:", newAccessToken);
    return newAccessToken;
  } catch (err) {
    console.error("Refresh failed:", err.response?.data || err.message);
    localStorage.removeItem("accessToken");
    return null;
  }
};
