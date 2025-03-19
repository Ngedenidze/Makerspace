// src/components/Profile.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Profile.css"; // Make sure to import the CSS

const apiUrl =
  process.env.NODE_ENV === "production"
    ? "https://makerspace-cffwdbazgbh3ftdq.westeurope-01.azurewebsites.net"
    : "";

function Profile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const data = response.data;
        setProfile(data);
      })
      .catch((error) => {
        console.error("Profile fetch error:", error.response?.data || error.message);
        // If unauthorized or error, remove token and redirect to login
        localStorage.removeItem("authToken");
        navigate("/login");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [navigate]);

  if (loading) {
    return <div className="profile-container">Loading profile...</div>;
  }

  if (!profile) {
    return <div className="profile-container">Could not load profile data.</div>;
  }

  // Format the dates if needed
  const createdAtFormatted = new Date(profile.createdAt).toLocaleString();
  const birthdateFormatted = new Date(profile.birthdate).toLocaleDateString();

  return (
    <div className="profile-container">
      <h1 className="profile-header">Welcome, {profile.firstName}!</h1>
      <div className="profile-info">
        <p>
          <strong>Name:</strong> {profile.firstName} {profile.lastName}
        </p>
        <p>
          <strong>Email:</strong> {profile.email}
        </p>
        <p>
          <strong>Phone:</strong> {profile.phoneNumber}
        </p>
        <p>
          <strong>Verified:</strong> {profile.isVerified ? "Yes" : "No"}
        </p>
        <p>
          <strong>Role:</strong> {profile.role}
        </p>
        <p>
          <strong>Country:</strong> {profile.country}
        </p>
        <p>
          <strong>Personal Number:</strong> {profile.personalNumber}
        </p>
        <p>
          <strong>Birthdate:</strong> {birthdateFormatted}
        </p>
        <p>
          <strong>Social Media Link:</strong>{" "}
          {profile.socialMediaProfileLink || "N/A"}
        </p>
        <p>
          <strong>Created At:</strong> {createdAtFormatted}
        </p>
      </div>

      <button
        className="profile-logout-button"
        onClick={() => {
          // Logout logic
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
