import React, { useEffect, useState, useCallback, useRef } from "react"; // Added useRef
import { useNavigate } from "react-router-dom";
import api from "../authPage/utils/AxiosInstance";
import { useTranslation } from "react-i18next";
import { useAuth } from "../authPage/utils/AuthProvider";
import "./Profile.css"; // Ensure this CSS supports the new classes/structure
import profileCover from "./../../../assets/profile-cover.webp";
import Loader from "../../reusable/Loader/Loader";
import { toast } from "react-toastify";
import TicketCard from "./Ticket Card/TicketCard";

// EditIcon component is no longer needed here if not used elsewhere

function Profile() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false); // For Save button loading state

  // Tickets state (remains the same)
  const [tickets, setTickets] = useState([]);
  const [ticketsVisible, setTicketsVisible] = useState(false);
  const [ticketsLoading, setTicketsLoading] = useState(false);
  const [ticketsError, setTicketsError] = useState(null);

  const { token, clearToken } = useAuth();

  // Global edit mode state
  const [isEditingMode, setIsEditingMode] = useState(false);

  // Form state for editable fields
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    country: "",
    birthdate: "", // Will store as YYYY-MM-DD for input
    socialMediaProfileLink: "",
  });

  // Refs for auto-focus (optional but good UX)
  const firstNameInputRef = useRef(null);


  // Format date helper
  const formatDate = (dateString) => {
    if (!dateString) return t("n_a", "N/A");
    const date = new Date(dateString);
    // Check if date is valid
    if (isNaN(date.getTime())) {
        return t("invalid_date", "Invalid Date");
    }
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();

    const monthKeys = [
      "january", "february", "march", "april", "may", "june",
      "july", "august", "september", "october", "november", "december",
    ];
    const monthTranslated = t(`months.${monthKeys[monthIndex]}`);
    return `${monthTranslated} ${day}, ${year}`;
  };

  // Helper to format date for input type="date" (YYYY-MM-DD)
  const formatDateForInput = (isoDateString) => {
    if (!isoDateString) return "";
    try {
      return new Date(isoDateString).toISOString().split("T")[0];
    } catch (e) {
      return ""; // Handle invalid date strings gracefully
    }
  };


  // Fetch profile on mount
  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    setLoading(true); // Ensure loading is true at the start of fetch
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
            birthdate: formatDateForInput(data.birthdate), // Format for date input
            socialMediaProfileLink: data.socialMediaProfileLink || "",
          });
        } else {
          toast.error(t("error.load_profile_failed", "Failed to load profile. Please log in again."));
          clearToken();
          navigate("/login");
        }
      })
      .catch(() => {
        toast.error(t("error.load_profile_failed", "Failed to load profile. Please log in again."));
        clearToken();
        navigate("/login");
      })
      .finally(() => setLoading(false));
  }, [token, navigate, clearToken, t]);


  // Auto-focus the first editable input when entering edit mode
  useEffect(() => {
    if (isEditingMode && firstNameInputRef.current) {
      firstNameInputRef.current.focus();
    }
  }, [isEditingMode]);


  // Fetch tickets when expanded (remains the same)
  useEffect(() => {
    // Only fetch if:
    // 1. The tickets section is meant to be visible.
    // 2. We are not already loading tickets (to prevent concurrent fetches).
    // 3. We don't have any tickets yet (tickets.length === 0). This means we fetch once
    //    when the section becomes visible and is empty. If the API returns an empty array,
    //    tickets.length will remain 0, and this logic will try to fetch again if ticketsVisible changes
    //    or if the token changes. This is usually acceptable behavior.

    if (ticketsVisible && !ticketsLoading && tickets.length === 0) {
      setTicketsLoading(true);
      setTicketsError(null); // Reset error before a new fetch

      api.get("/Tickets/my-tickets", { headers: { Authorization: `Bearer ${token}` } }) // Assuming token is needed for auth
        .then(({ data }) => {
           if (Array.isArray(data)) {
            // Sort the tickets here before setting state
            // Create a new sorted array to avoid mutating the original response data directly (good practice)
            const sortedTickets = [...data].sort((a, b) => b.id - a.id); // Sorts in descending order of id
            setTickets(sortedTickets);

        } else {
            console.error("Fetched tickets data is not an array:", data);
            setTickets([]); // Default to empty array if data is not in expected format
            setTicketsError(t("error.fetch_tickets_format", "Unexpected format for ticket data."));
          }
        })
        .catch((err) => {
          console.error("Error fetching tickets:", err);
          setTicketsError(err.response?.data?.message || err.message || t("error.fetch_tickets", "Failed to fetch tickets."));
          // Optionally setTickets([]) here if you want to clear on error,
          // but be mindful if this could re-trigger fetches based on other conditions.
          // For now, let the error state handle the display.
        })
        .finally(() => {
          setTicketsLoading(false);
        });
    }
    
    // If ticketsVisible becomes false, you might want to clear the tickets
    // if you don't want to cache them for the next time the section is opened.
    // else if (!ticketsVisible) {
    //   setTickets([]); // This would mean tickets are fetched fresh each time it's opened
    // }

  }, [ticketsVisible, token, t]); // Added token and t, ticketsLoading

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditToggle = () => {
    if (!isEditingMode && profile) {
      // Entering edit mode, ensure formData is fresh from profile
      setFormData({
        firstName: profile.firstName || "",
        lastName: profile.lastName || "",
        phoneNumber: profile.phoneNumber || "",
        country: profile.country || "",
        birthdate: formatDateForInput(profile.birthdate),
        socialMediaProfileLink: profile.socialMediaProfileLink || "",
      });
    }
    setIsEditingMode((prev) => !prev);
  };

  const handleCancelEdit = () => {
    setIsEditingMode(false);
    // Reset formData to original profile data
    if (profile) {
      setFormData({
        firstName: profile.firstName || "",
        lastName: profile.lastName || "",
        phoneNumber: profile.phoneNumber || "",
        country: profile.country || "",
        birthdate: formatDateForInput(profile.birthdate),
        socialMediaProfileLink: profile.socialMediaProfileLink || "",
      });
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Ensure birthdate is in a format the backend expects, or remove if it shouldn't be sent as YYYY-MM-DD
    // For example, if backend expects ISO string or null:
    // const payload = {
    //   ...formData,
    //   birthdate: formData.birthdate ? new Date(formData.birthdate).toISOString() : null,
    // };

    try {
      // Using formData directly if backend accepts YYYY-MM-DD for birthdate
      const { data: updatedProfile } = await api.put("/auth/me", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success(t("profile_updated", "Profile updated successfully!"));
      setProfile(prevProfile => ({ ...prevProfile, ...formData })); // Optimistically update with formData
      // Or, if API returns the full updated profile, use that:
      // setProfile(updatedProfile);
      // setFormData({ // Re-sync formData if necessary, especially if API cleans/transforms data
      //   firstName: updatedProfile.firstName || "",
      //   lastName: updatedProfile.lastName || "",
      //   phoneNumber: updatedProfile.phoneNumber || "",
      //   country: updatedProfile.country || "",
      //   birthdate: formatDateForInput(updatedProfile.birthdate),
      //   socialMediaProfileLink: updatedProfile.socialMediaProfileLink || "",
      // });
      setIsEditingMode(false);
    } catch (err) {
      console.error("Error updating profile:", err);
      const errorMessage = err.response?.data?.message || t("error.profile_update_failed", "Failed to update profile. Please try again.");
      toast.error(errorMessage);
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (e) {
      console.warn("Server logout failed:", e);
    }
    clearToken();
    toast.info(t("logout_successful", "You have been logged out."));
    navigate("/login");
  };


  if (loading) return <div className="profile-container"><Loader /></div>;
  if (!profile) return <div className="profile-container page-message">{t("profile_not_loaded", "Profile could not be loaded.")}</div>;

  // Display values should come from `profile` state when not editing
  // Formatted dates for display
  const displayBirthdateFormatted = profile.birthdate ? formatDate(profile.birthdate) : t("n_a", "N/A");
  const createdAtFormatted = profile.createdAt ? formatDate(profile.createdAt) : t("n_a", "N/A");


  return (
    <div className="profile-container">
      <div className="profile-image-wrapper">
        <img src={profileCover} alt={t("profile_cover_image", "Profile cover")} />
      </div>

      {profile.status === "Verified" && (<div className="verification-status verified">{t("verified", "Verified")}</div>)}
      {profile.status === "Rejected" && (<div className="verification-status rejected">{t("rejected", "Rejected")}</div>)}
      {profile.status === "Pending" && (<div className="verification-status pending">{t("pending", "Pending")}</div>)}

      <div className="profile-info">
        <h1 className="profile-header">
          {t("welcome", "Welcome, {{name}}", { name: profile.firstName || "User" })}
        </h1>

        {/* Edit/Save/Cancel Buttons */}
        <div className="profile-edit-controls">
          {!isEditingMode ? (
            <button onClick={handleEditToggle} className="edit-profile-button">
              {t("edit_profile", "Edit Profile")}
            </button>
          ) : (
            <>
              <button onClick={handleSave} className="save-button" disabled={isSaving}>
                {isSaving ? t("saving", "Saving...") : t("save_changes", "Save Changes")}
              </button>
              <button onClick={handleCancelEdit} className="cancel-button" disabled={isSaving}>
                {t("cancel", "Cancel")}
              </button>
            </>
          )}
        </div>

        <p>
          <strong>{t("name")}:</strong>
          {isEditingMode ? (
            <input
              ref={firstNameInputRef}
              type="text"
              name="firstName"
              className="form-input-editable"
              value={formData.firstName}
              onChange={handleChange}
            />
          ) : (
            <span>{profile.firstName || t("n_a", "N/A")}</span>
          )}
        </p>
        <p>
          <strong>{t("last_name")}:</strong>
          {isEditingMode ? (
            <input
              type="text"
              name="lastName"
              className="form-input-editable"
              value={formData.lastName}
              onChange={handleChange}
            />
          ) : (
            <span>{profile.lastName || t("n_a", "N/A")}</span>
          )}
        </p>

        <p><strong>{t("email")}:</strong> <span>{profile.email || t("n_a", "N/A")}</span></p>
        <p><strong>{t("personal_number")}:</strong> <span>{profile.personalNumber || t("n_a", "N/A")}</span></p>

        <p>
          <strong>{t("phone")}:</strong>
          {isEditingMode ? (
            <input
              type="tel"
              name="phoneNumber"
              className="form-input-editable"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
          ) : (
            <span>{profile.phoneNumber || t("n_a", "N/A")}</span>
          )}
        </p>
        <p>
          <strong>{t("country")}:</strong>
          {isEditingMode ? (
            <select
              name="country"
              className="form-input-editable"
              onChange={handleChange}
              value={formData.country}
            >
              <option value="">{t("auth.select_country", "Select a country")}</option>
              {/* TODO: Populate with a dynamic list of countries if needed */}
              <option value="Georgia">Georgia</option>
              <option value="USA">USA</option>
              <option value="Germany">Germany</option>
              <option value="Other">Other</option>
            </select>
          ) : (
            <span>{profile.country || t("n_a", "N/A")}</span>
          )}
        </p>
        <p>
          <strong>{t("birthdate")}:</strong>
          {isEditingMode ? (
            <input
              type="date"
              name="birthdate"
              className="form-input-editable"
              value={formData.birthdate} // Already formatted as YYYY-MM-DD
              onChange={handleChange}
            />
          ) : (
            <span>{displayBirthdateFormatted}</span>
          )}
        </p>
        <p>
          <strong>{t("social_media_link")}:</strong>
          {isEditingMode ? (
            <input
              type="url"
              name="socialMediaProfileLink"
              className="form-input-editable"
              placeholder="https://example.com/profile"
              value={formData.socialMediaProfileLink}
              onChange={handleChange}
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
            <span className="social-link na">{t("n_a", "N/A")}</span>
          )}
        </p>
        <p><strong>{t("profile_created_on", "Profile Created On")}:</strong> <span>{createdAtFormatted}</span></p>
      </div>

      {/* Buttons Section (Tickets, QR Scan, Logout) */}
      <section className="profile-page-buttons">
        <button
          onClick={() => setTicketsVisible((prev) => !prev)}
          className="toggle-tickets-button"
        >
          {t(ticketsVisible ? "collapse_my_tickets" : "my_tickets", ticketsVisible ? "Collapse" : "My Tickets")}
        </button>
        {profile.role === "Admin" && (
          <button
            className="scan-qr-button"
            onClick={() => navigate("/QRScan")}
          >
            {t("scan_qr_code", "Scan QR")}
          </button>
        )}
        <button className="profile-logout-button" onClick={handleLogout}>
          {t("logout", "Logout")}
        </button>
      </section>

      {/* Tickets Section Display */}
      {ticketsVisible && (
         <div className="my-tickets-section">
          <h2 className="my-tickets-header">{t("my_tickets_title", "My Tickets")}</h2>
          <div className="my-tickets-list">
            {ticketsLoading ? (
              <Loader />
            ) : ticketsError ? (
              <p className="error-text">
                {t("tickets_error", "Error loading tickets")}: {ticketsError}
              </p>
            ) : tickets.length > 0 ? (
              tickets.map((ticket) => (
    <TicketCard key={ticket.id} ticket={ticket} formatDate={formatDate} />
  ))
) : (
  <p>{t("no_tickets_found", "You have no tickets.")}</p>
)}
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;