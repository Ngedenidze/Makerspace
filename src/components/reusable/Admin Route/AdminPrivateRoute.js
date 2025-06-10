import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../pages/authPage/utils/AuthProvider";
import api from "../../pages/authPage/utils/AxiosInstance";

function AdminPrivateRoute({ children }) {
  const { token } = useAuth();
  const [isAdmin, setIsAdmin] = useState(null); // null = loading, true/false = result

  useEffect(() => {
    if (!token) {
      setIsAdmin(false);
      return;
    }

    const fetchUserPermission = async () => {
      try {
        // Use your axios instance instead of fetch.
        const response = await api.get("/users/me");
        const data = response.data;

        setIsAdmin(data.role === "Admin");
      } catch (error) {

        setIsAdmin(false);
      }
    };

    fetchUserPermission();
  }, [token]);

  // Render a loading indicator while checking admin status.
  if (isAdmin === null) {
    return <div>Loading...</div>;
  }

  // If token exists and user is admin, render children; otherwise, redirect.
  return token && isAdmin ? children : <Navigate to="/login" />;
}

export default AdminPrivateRoute;
