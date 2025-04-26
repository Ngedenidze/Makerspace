// AuthProvider.js
import React, { createContext, useContext, useState, useEffect } from "react";
import { refreshAccessToken } from "./AuthService";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("accessToken"));
  const [loading, setLoading] = useState(true);

  const saveToken = (newToken) => {
    localStorage.setItem("accessToken", newToken);
    setToken(newToken);
  };

  const clearToken = () => {
    localStorage.removeItem("accessToken");
    setToken(null);
  };
  useEffect(() => {
    (async () => {
      const newToken = await refreshAccessToken();
      if (newToken) {
        saveToken(newToken);
      } else {
        clearToken();
      }
      setLoading(false);
    })();
  }, []);

  // While we’re refreshing, don’t render any children (or show a spinner)
  if (loading) {
    return null; 
  }
  return (
    <AuthContext.Provider value={{ token, saveToken, clearToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

export default AuthContext;
