import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../authPage/utils/AxiosInstance";
import { useTranslation } from "react-i18next";
import { useAuth } from "../authPage/utils/AuthProvider";
import "./Profile.css";
import profileCover from "./../../../assets/profile-cover.webp";
import Loader from "../../reusable/Loader/Loader";

function EditIcon({ className, onClick }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width="16"
      height="16"
      viewBox="0 0 30 30"
      className={className}
      onClick={onClick}
    >
      <path d="M 22.828125 3 C 22.316375 3 21.804562 3.1954375 21.414062 3.5859375 L 19 6 L 24 11 L 26.414062 8.5859375 C 27.195062 7.8049375 27.195062 6.5388125 26.414062 5.7578125 L 24.242188 3.5859375 C 23.851688 3.1954375 23.339875 3 22.828125 3 z M 17 8 L 5.2597656 19.740234 C 5.2597656 19.740234 6.1775313 19.658 6.5195312 20 C 6.8615312 20.342 6.58 22.58 7 23 C 7.42 23.42 9.6438906 23.124359 9.9628906 23.443359 C 10.281891 23.762359 10.259766 24.740234 10.259766 24.740234 L 22 13 L 17 8 z M 4 23 L 3.0566406 25.671875 A 1 1 0 0 0 3 26 A 1 1 0 0 0 4 27 A 1 1 0 0 0 4.328125 26.943359 A 1 1 0 0 0 4.3378906 26.939453 L 4.3632812 26.931641 A 1 1 0 0 0 4.3691406 26.927734 L 7 26 L 5.5 24.5 L 4 23 z"></path>
    </svg>
  );
}

function Profile() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Tickets state
  const [tickets, setTickets] = useState([]);
  const [ticketsVisible, setTicketsVisible] = useState(false);
  const [ticketsLoading, setTicketsLoading] = useState(false);
  const [ticketsError, setTicketsError] = useState(null);

  const { token, clearToken } = useAuth();
  const [editingFields, setEditingFields] = useState({});
  const toggleEditing = (field) => {
    setEditingFields((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  // Form state for editable fields
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    country: "",
    birthdate: "",
    socialMediaProfileLink: "",
  });

  // Format date helper (unchanged)
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
    return `${monthTranslated} ${day}, ${year}`;
  };

  // Fetch profile on mount
  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    api
      .get("/auth/me", { headers: { Authorization: `Bearer ${token}` } })
      .then(({ data }) => {
        if (data?.id > 0) {
          setProfile(data);
          setFormData({
            firstName: data.firstName || "",
            lastName: data.lastName || "",
            phoneNumber: data.phoneNumber || "",
            country: data.country || "",
            birthdate: data.birthdate || "",
            socialMediaProfileLink: data.socialMediaProfileLink || "",
          });
        } else {
          clearToken();
          navigate("/login");
        }
      })
      .catch(() => {
        clearToken();
        navigate("/login");
      })
      .finally(() => setLoading(false));
  }, [token, navigate, clearToken, t]);

  // Fetch tickets when expanded
  useEffect(() => {
    if (ticketsVisible && tickets.length === 0) {
      setTicketsLoading(true);
      api
        .get("/Tickets/my-tickets")
        .then(({ data }) => setTickets(data))
        .catch((err) =>
          setTicketsError(err.response?.data?.message || err.message)
        )
        .finally(() => setTicketsLoading(false));
    }
  }, [ticketsVisible, tickets.length]);

   if (loading) return <div className="profile-container"><Loader /></div>;
  if (!profile) return <div className="profile-container">{t("profile_not_loaded")}</div>;

  const createdAtFormatted = formatDate(profile.createdAt);
  const birthdateFormatted = formatDate(profile.birthdate);

  // Handle edits
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    api
      .put("/auth/me", formData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => alert(t("profile_updated")))
      .catch((err) => console.error(err));
  };
  const handleLogout = async () => {
    try {
      // 1) Invalidate refresh cookie on the server
      await api.post("/auth/logout");
    } catch (e) {
      console.warn("Server logout failed:", e);
    }
    // 2) Clear client‐side tokens
    clearToken();
    navigate("/login");
  };

  return (
    <div className="profile-container">
      <div className="profile-image-wrapper">
        <img src={profileCover} alt={t("profile_cover_image")} />
      </div>

      {/* Verification Status */}
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
        <h1 className="profile-header">
          {t("welcome", { name: profile.firstName })}
        </h1>

        <p className={editingFields.firstName ? "editing" : ""}>
          <strong>{t("name")}:</strong>
          {editingFields.firstName ? (
            <input
              type="text"
              name="firstName"
              className="form-input-editable"
              value={formData.firstName}
              onChange={handleChange}
              readOnly={!editingFields.firstName}
            />
          ) : (
            <span>{profile.firstName}</span>
          )}
          <EditIcon
            className="icon-svg"
            onClick={() => toggleEditing("firstName")}
          />
        </p>
        <p className={editingFields.lastName ? "editing" : ""}>
          <strong>{t("last_name")}:</strong>
          {editingFields.lastName ? (
            <input
              type="text"
              name="lastName"
              className="form-input-editable"
              value={formData.lastName}
              onChange={handleChange}
              readOnly={!editingFields.lastName}
            />
          ) : (
            <span>{profile.lastName}</span>
          )}
          <EditIcon
            className="icon-svg"
            onClick={() => toggleEditing("lastName")}
          />
        </p>

        <p>
          <strong>{t("email")}:</strong> <span>{profile.email}</span>
        </p>
        <p>
          <strong>{t("personal_number")}:</strong>{" "}
          <span>{profile.personalNumber}</span>
        </p>

        <p className={editingFields.phoneNumber ? "editing" : ""}>
          <strong>{t("phone")}:</strong>
          {editingFields.phoneNumber ? (
            <input
              type="tel"
              name="phoneNumber"
              className="form-input-editable"
              value={formData.phoneNumber}
              onChange={handleChange}
              readOnly={!editingFields.phoneNumber}
            />
          ) : (
            <span>{profile.phoneNumber}</span>
          )}
          <EditIcon
            className="icon-svg"
            onClick={() => toggleEditing("phoneNumber")}
          />
        </p>
        <p className={editingFields.country ? "editing" : ""}>
          <strong>{t("country")}:</strong>
          {editingFields.country ? (
            <select
              name="country"
              id="country"
              className="form-input-editable"
              onChange={handleChange}
              value={formData.country}
            >
              <option value="">
                {t("auth.select_country", "Select a country")}
              </option>
              <option value="Georgia">Georgia</option>
              <option value="Other">Other</option>
            </select>
          ) : (
            <span>{profile.country}</span>
          )}
          <EditIcon
            className="icon-svg"
            onClick={() => toggleEditing("country")}
          />
        </p>
        <p>
          <strong>{t("birthdate")}:</strong> {birthdateFormatted}
        </p>
        <p className={editingFields.socialMediaProfileLink ? "editing" : ""}>
          <strong>{t("social_media_link")}:</strong>
          {editingFields.socialMediaProfileLink ? (
            <input
              type="url"
              name="socialMediaProfileLink"
              className="form-input-editable"
              value={formData.socialMediaProfileLink}
              onChange={handleChange}
              readOnly={!editingFields.socialMediaProfileLink}
            />
          ) : profile.socialMediaProfileLink ? (
            <a
              href={profile.socialMediaProfileLink}
              className="social-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              {profile.socialMediaProfileLink}
            </a>
          ) : (
            <span className="social-link na">{t("n_a")}</span>
          )}
          <EditIcon
            className="icon-svg"
            onClick={() => toggleEditing("socialMediaProfileLink")}
          />
        </p>

        <button className="save-button" onClick={handleSave}>
          {t("save_changes")}
        </button>
      </div>

      {/* Buttons Section */}
      <section className="profile-page-buttons">
        <button
          onClick={() => setTicketsVisible((prev) => !prev)}
          className="toggle-tickets-button"
        >
          {t(ticketsVisible ? "collapse_my_tickets" : "tickets")}
        </button>
        {profile.role === "Admin" && (
          <button
            className="scan-qr-button"
            onClick={() => navigate("/QRScan")}
          >
            {t("scan_qr_code")}
          </button>
        )}
        <button className="profile-logout-button" onClick={handleLogout}>
          {t("logout")}
        </button>
      </section>

      {/* Tickets Section */}
      <div className="my-tickets-section">
        {ticketsVisible && (
          <div className="my-tickets">
            {ticketsLoading ? (
              <p>{t("loading_tickets")}</p>
            ) : ticketsError ? (
              <p className="error">
                {t("tickets_error")}: {ticketsError}
              </p>
            ) : tickets.length > 0 ? (
              tickets.map((ticket) => (
                <div key={ticket.id} className="ticket-item">
                  <p>
                    <strong>{t("ticket_id")}:</strong> {ticket.id}
                  </p>
                  <p>
                    <strong>{t("ticket_used")}:</strong>{" "}
                    {ticket.isUsedTicket ? t("yes") : t("no")}
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
