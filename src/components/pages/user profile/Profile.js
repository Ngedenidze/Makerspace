// src/components/Profile.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../authPage/utils/AxiosInstance";
import { useTranslation } from "react-i18next";
import { useAuth } from "../authPage/utils/AuthProvider";
import "./Profile.css";
import profileCover from "./../../../assets/profile-cover.webp"; // Adjust the path as necessary
function Profile() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // New states to handle tickets
  const [tickets, setTickets] = useState([]);
  const [ticketsVisible, setTicketsVisible] = useState(false);
  const [ticketsLoading, setTicketsLoading] = useState(false);
  const [ticketsError, setTicketsError] = useState(null);
  const { token, clearToken } = useAuth();
  // Format date function (kept the same)
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();

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

  // Fetch profile
  useEffect(() => {
    if (!token) {
      console.log("No token found");
      navigate("/login");
      return;
    }
    console.log("Token exists:", token);

    api
      .get("/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log("Profile fetch response:", response.data);
        const data = response.data;
        if (data && data.id > 0) {
          setProfile(data);
        } else {
          console.warn("Profile data is empty or missing an ID");
          clearToken(); // update context state
          navigate("/login");
        }
      })
      .catch((error) => {
        console.error(
          "Profile fetch error:",
          error.response?.data || error.message
        );
        clearToken(); // update context state
        navigate("/login");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [token, navigate, clearToken]);
  

  // Fetch tickets when the "My Tickets" section is expanded and tickets haven't been loaded yet.
  useEffect(() => {
    if (ticketsVisible && tickets.length === 0) {
      setTicketsLoading(true);
      api
        .get("/Tickets/my-tickets")
        .then((response) => {
          setTickets(response.data);
        })
        .catch((error) => {
          console.error("Error fetching tickets:", error.response?.data || error.message);
          setTicketsError(error.response?.data?.message || error.message || "Unknown error");
        })
        .finally(() => {
          setTicketsLoading(false);
        });
    }
  }, [ticketsVisible, tickets.length]);

  if (loading) {
    return <div className="profile-container">{t("loading_profile")}</div>;
  }

  if (!profile) {
    return <div className="profile-container">{t("profile_not_loaded")}</div>;
  }

  const createdAtFormatted = formatDate(profile.createdAt);
  const birthdateFormatted = formatDate(profile.birthdate);

  return (
    <div className="profile-container">
      <div className="profile-image-wrapper">
        <img
          className="profile-cover-image"
          src={profileCover}
          alt={t("profile_cover_image")}
          loading="lazy"
        />
     
      </div>
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
      <h1>
        {t("welcome", { name: profile.firstName })}
      </h1>
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
             className="social-link"
              href={profile.socialMediaProfileLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              {profile.socialMediaProfileLink}
            </a>
          ) : (
            <span className="social-link na">{t("n_a")}</span>
          )}
        </p>
      </div>

      {/* Expandable/Collapsible "My Tickets" Section */}
     <section className="profile-page-buttons">
      <button
          onClick={() => setTicketsVisible((prevVisible) => !prevVisible)}
          className="toggle-tickets-button"
        >
          {/* {ticketsVisible ? t("collapse_my_tickets") : t("expand_my_tickets")} */}
          My Tickets
        </button>
      {/* Conditionally render the Scan QR Code button for admin users */}
      {profile.role === "Admin" && (
        <button
          className="scan-qr-button"
          onClick={() => navigate("/QRScan")}
        >
          {/* {t("scan_qr_code") || "Scan QR Code"} */}
          Scan QR Code
        </button>
      )}

      <button
        className="profile-logout-button"
        onClick={() => {
          localStorage.removeItem("accessToken");
          window.location.reload();
        }}
      >
        {t("logout")}
      </button>
      </section>
      <div className="my-tickets-section">
       
       {ticketsVisible && (
         <div className="my-tickets">
           {ticketsLoading ? (
             <p>{t("loading_tickets")}</p>
           ) : ticketsError ? (
             <p className="error">
               {t("tickets_error")}: {ticketsError}
             </p>
           ) : tickets && tickets.length > 0 ? (
             tickets.map((ticket) => (
               <div key={ticket.id} className="ticket-item">
                 <p>
                   <strong>{ "Ticket ID" || t("ticket_id")}:</strong> {ticket.id}
                 </p>
                 <p>
                   <strong>{"Used" || t("ticket_used") }:</strong>{" "}
                   {ticket.isUsedTicket ? (t("yes") || "Yes") : (t("no") || "No")}
                 </p>
               </div>
             ))
           ) : (
             <p>{t("no_tickets")}</p>
           )}
         </div>
       )}
     </div>
    </div>
  );
}

export default Profile;
