import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./DJs.css";
import { Trans } from "react-i18next";
import coverImage from "./../../../assets/makerspace_logo_about.jpeg";  
import stage1 from "./../../../assets/stage-1.jpeg";
import stage2 from "./../../../assets/stage-2.jpeg"; 
const DJs = () => {
  const { id } = useParams();
  const [images, setImages] = useState([]);
  const { t, i18n } = useTranslation();

  // Controlled form fields for DJ contact form
  const [fullName, setFullName] = useState("");
  const [stageName, setStageName] = useState("");
  const [socialLink, setSocialLink] = useState("");
  const [musicLink, setMusicLink] = useState("");
  const [motivation, setMotivation] = useState(""); 

  // State for handling loading, error, and success messages
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");



  // Simulate fetching images
  // Submit handler for the DJ form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    // Construct the concatenated string using a delimiter "||"
    const formDataString = `Full Name: ${fullName}||Stage Name: ${stageName}||Social Network Link: ${socialLink}||Music Platform Link: ${musicLink}||Motivation: ${motivation}`;
    console.log("Form Data String:", formDataString);

    const apiUrl = "/api/email/DJRequest";

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // Convert the string to a JSON string literal so that the API receives a raw string
        body: JSON.stringify(formDataString),
      });

      // Determine the content type of the response for proper parsing
      const contentType = response.headers.get("content-type") || "";
      if (!response.ok) {
        const errorData = contentType.includes("application/json")
          ? await response.json()
          : await response.text();
        throw new Error(
          `Error ${response.status}: ${
            typeof errorData === "object"
              ? JSON.stringify(errorData)
              : errorData
          }`
        );
      }

      const responseData = contentType.includes("application/json")
        ? await response.json()
        : await response.text();

      console.log("Submission successful:", responseData);
      setSuccess("Your request has been sent successfully!");
      // Clear form fields upon success
      setFullName("");
      setStageName("");
      setSocialLink("");
      setMusicLink("");
      setMotivation("");
    } catch (err) {
      console.error("Error submitting form:", err);
      setError("Failed to send your request. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="djs-page">
      <div className="djs-cover-image-wrapper">
        <img
          className="djs-cover-image"
          src={coverImage}
          alt="DJs Cover"
          loading="lazy"
        />
      </div>

      <div className="djs-top-bar">
        <h1 className="djs-title">{t("dj_perform")}</h1>
        <p className="djs-description">
        <Trans i18nKey="dj_perform_info" />
        </p>
      </div>

      <div className="djs-stage-image-wrapper">
        <img
          className="djs-stage-image stage-1"
          src={stage1}
          alt="DJs Cover"
          loading="lazy"
        />
        <img
          className="djs-stage-image stage-2"
          src={stage2}
          alt="DJs Cover"
          loading="lazy"
        />
      </div>

      <section className="djs-contact">
        <section className="djs-contact-heading">
          <h2 className="djs-contact-title">{t("dj_perform_title")}</h2>
          <p className="djs-contact-description">
            {t("dj_perform_text")}
          </p>
          <h2>{t("dj_perform_see_you_on_dancefloor")}</h2>
        </section>

        <section className="djs-contact-form">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder={t("dj_form_full_name")}
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder={t("dj_form_stage_name")}
              value={stageName}
              onChange={(e) => setStageName(e.target.value)}
              required
            />
            <input
              type="url"
              placeholder={t("dj_form_social")}
              value={socialLink}
              onChange={(e) => setSocialLink(e.target.value)}
              required
            />
            <input
              type="url"
              placeholder={t("dj_form_music")}
              value={musicLink}
              onChange={(e) => setMusicLink(e.target.value)}
              required
            />
            <textarea
              placeholder={t("dj_form_motivation")}
              value={motivation}
              onChange={(e) => setMotivation(e.target.value)}
              required
            ></textarea>
            <button type="submit" disabled={loading}>
              {loading ? t("dj_form_submitting") : t("dj_form_submit")}
            </button>
          </form>

          {error && (
            <p
              className="error-message"
              style={{ color: "red", marginTop: "1rem" }}
            >
              {error}
            </p>
          )}
          {success && (
            <p
              className="success-message"
              style={{ color: "green", marginTop: "1rem" }}
            >
              {success}
            </p>
          )}

          <p className="djs-contact-info">
          {t("contact_info_sub")} <br></br>+995 577 900 061
            <br></br>
            <a href="mailto:contact@makerspaceclub.com">
              contact@makerspaceclub.com
            </a>
          </p>
        </section>
      </section>
    </div>
  );
};

export default DJs;
