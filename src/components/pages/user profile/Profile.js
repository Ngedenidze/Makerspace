// src/components/Profile.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../sections/authPage/utils/AxiosInstance"; // Axios instance
import { useTranslation } from "react-i18next";
import "./Profile.css";

function Profile() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Define a function to format dates using i18n translations
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();

    // Mapping array for months – keys must match your translation file entries
    const monthKeys = [
      "january",
      "february",
      "march",
      "april",
      "may",
      "june",
      "july",
      "august",
      "september",
      "october",
      "november",
      "december",
    ];
    const monthTranslated = t(`months.${monthKeys[monthIndex]}`);

    // Determine ordinal suffix (this logic works well for English)
    let suffix = "th";
    if (day % 10 === 1 && day !== 11) {
      suffix = "st";
    } else if (day % 10 === 2 && day !== 12) {
      suffix = "nd";
    } else if (day % 10 === 3 && day !== 13) {
      suffix = "rd";
    }
    const translatedSuffix = t(`ordinals.${suffix}`);

    return `${monthTranslated} ${day}, ${year}`;
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      console.log("No token found");
      navigate("/login");
      return;
    }
    console.log("Token exists:", token);

    // Fetch user profile from a protected endpoint
    api
      .get("/auth/me")
      .then((response) => {
        setProfile(response.data);
      })
      .catch((error) => {
        console.error(
          "Profile fetch error:",
          error.response?.data || error.message
        );
        localStorage.removeItem("accessToken");
        navigate("/login");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [navigate]);

  if (loading) {
    return <div className="profile-container">{t("loading_profile")}</div>;
  }

  if (!profile) {
    return (
      <div className="profile-container">{t("profile_not_loaded")}</div>
    );
  }

  // Format dates using the new formatDate function
  const createdAtFormatted = formatDate(profile.createdAt);
  const birthdateFormatted = formatDate(profile.birthdate);

  return (
    <div className="profile-container">
      <h1 className="profile-header">
        {t("welcome", { name: profile.firstName })}
      </h1>

      {/* Verification Status Block */}
      {profile.status === "Verified" && (
        <div className="verification-status verified">{t("verified")}</div>
      )}
      {profile.status === "Rejected" && (
        <div className="verification-status rejected">{t("rejected")}</div>
      )}
      {profile.status === "Pending" && (
        <div className="verification-status pending">{t("pending")}</div>
      )}

      <div className="profile-info">
        <p>
          <strong>{t("name")}:</strong> {profile.firstName} {profile.lastName}
        </p>
        <p>
          <strong>{t("email")}:</strong> {profile.email}
        </p>
        <p>
          <strong>{t("phone")}:</strong> {profile.phoneNumber}
        </p>
        <p>
          <strong>{t("country")}:</strong> {profile.country}
        </p>
        <p>
          <strong>{t("personal_number")}:</strong> {profile.personalNumber}
        </p>
        <p>
          <strong>{t("birthdate")}:</strong> {birthdateFormatted}
        </p>
        <p>
          <strong>{t("social_media_link")}:</strong>{" "}
          {profile.socialMediaProfileLink ? (
            <a
              href={profile.socialMediaProfileLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              {profile.socialMediaProfileLink}
            </a>
          ) : (
            t("n_a")
          )}
        </p>
      </div>

      <button
        className="profile-logout-button"
        onClick={() => {
          localStorage.removeItem("accessToken");
          window.location.reload();
        }}
      >
        {t("logout")}
      </button>
    </div>
  );
}

export default Profile;
