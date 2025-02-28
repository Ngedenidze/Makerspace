// src/components/Profile.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const apiUrl =
  process.env.NODE_ENV === "production"
    ? "https://makerspace-cffwdbazgbh3ftdq.westeurope-01.azurewebsites.net"
    : "";

function Profile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Retrieve token from localStorage
    const token = localStorage.getItem("authToken");
    if (!token) {
      // If no token, redirect to login
      navigate("/login");
      return;
    }

    // Fetch user profile from protected endpoint
    axios
      .get(`${apiUrl}/api/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`, // or however your backend expects the token
        },
      })
      .then((response) => {
        setProfile(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Profile fetch error:", error.response?.data || error.message);
        // If unauthorized or error, remove token and redirect to login
        localStorage.removeItem("authToken");
        navigate("/login");
      });
  }, [navigate]);

  if (loading) {
    return <div style={{ color: "#ccc" }}>Loading profile...</div>;
  }

  if (!profile) {
    return <div style={{ color: "#ccc" }}>Could not load profile data.</div>;
  }

  return (
    <div style={{ color: "#ccc" }}>
      <h1>Welcome, {profile.firstName}</h1>
      <p>Name: {profile.firstName} {profile.lastName}</p>
      <p>Email: {profile.email}</p>
      <p>Phone: {profile.phoneNumber}</p>
      {/* ...render other user fields as needed... */}

      <button
        onClick={() => {
          // Optionally provide a logout button
          localStorage.removeItem("authToken");
          navigate("/login");
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default Profile;
