// AuthProvider.js
import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import {jwtDecode} from "jwt-decode";
import { refreshAccessToken } from "./AuthService";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("accessToken"));
  const [loading, setLoading] = useState(true);
  const refreshTimer = useRef();

  const saveToken = (newToken) => {
    localStorage.setItem("accessToken", newToken);
    setToken(newToken);
  };

  const clearToken = () => {
    localStorage.removeItem("accessToken");
    setToken(null);
  };

  // Schedule a refresh one minute before expiry
  const scheduleRefresh = (jwt) => {
    // decode to get exp (in seconds)
    const { exp } = jwtDecode(jwt);
    const expiresAt = exp * 1000; 
    const now = Date.now();
    const delay = Math.max(expiresAt - now - 60_000, 0); // 1m before expiry
    clearTimeout(refreshTimer.current);
    refreshTimer.current = setTimeout(async () => {
      try {
        const newToken = await refreshAccessToken();
        if (newToken) {
          saveToken(newToken);
        } else {
          // refresh cookie probably invalid → log out
          clearToken();
        }
      } catch {
        clearToken();
      }
    }, delay);
  };

  // On mount, load token and start scheduling
  useEffect(() => {
    const existing = localStorage.getItem("accessToken");
    if (existing) {
      setToken(existing);
      scheduleRefresh(existing);
    }
    setLoading(false);
    // cleanup on unmount
    return () => clearTimeout(refreshTimer.current);
  }, []);

  // Whenever we save a new token, reschedule
  useEffect(() => {
    if (token) {
      scheduleRefresh(token);
    } else {
      clearTimeout(refreshTimer.current);
    }
  }, [token]);

  if (loading) return null;

  return (
    <AuthContext.Provider value={{ token, saveToken, clearToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
