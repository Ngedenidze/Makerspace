// src/components/Profile.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../sections/authPage/utils/AxiosInstance"; // Import the Axios instance
import "./Profile.css"; // Import the CSS

    function formatDate(dateString) {
      const date = new Date(dateString);
      const day = date.getDate();
      const month = date.toLocaleString("default", { month: "long" });
      const year = date.getFullYear();
    
      // Determine the ordinal suffix
      let suffix = "th";
      if (day % 10 === 1 && day !== 11) {
        suffix = "st";
      } else if (day % 10 === 2 && day !== 12) {
        suffix = "nd";
      } else if (day % 10 === 3 && day !== 13) {
        suffix = "rd";
      }
    
      return `${month} ${day}${suffix}, ${year}`;
    }

function Profile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      console.log("no token");
      // If no token, redirect to login
      navigate("/login");
      return;
    } 
    console.log("token exsists", token);

    // Fetch user profile from protected endpoint
    api.get("/auth/me")
    .then((response) => {
      setProfile(response.data);
    })
    .catch((error) => {
      console.error("Profile fetch error:", error.response?.data || error.message);
      localStorage.removeItem("accessToken");
      navigate("/login");
    })
    .finally(() => {
      setLoading(false);
    });
  }, []); 

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

      {/* Verification Status Block */}
      {profile.status === "Verified" && (
  <div className="verification-status verified">Verified</div>
)}
{profile.status === "Rejected" && (
  <div className="verification-status rejected">Rejected</div>
)}
{profile.status === "Pending" && (
  <div className="verification-status pending">Pending</div>
)}


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
          <strong>Country:</strong> {profile.country}
        </p>
        <p>
          <strong>Personal Number:</strong> {profile.personalNumber}
        </p>
        <p>
          <strong>Birthdate:</strong> {formatDate(profile.birthdate)}
        </p>
        <p>
          <strong>Social Media Link:</strong>{" "}
          {profile.socialMediaProfileLink ? (
            <a
              href={profile.socialMediaProfileLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              {profile.socialMediaProfileLink}
            </a>
          ) : (
            "N/A"
          )}
        </p>
      </div>

      <button
        className="profile-logout-button"
        onClick={() => {
          // Logout logic
          localStorage.removeItem("accessToken");
          window.location.reload();
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default Profile;
