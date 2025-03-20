import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import localImg from "../../assets/cover-art-5.jpg";
import ImageGrid from "../reusable/Image Grid/ImageGrid";

const DJs = () => {
  const { id } = useParams();
  const [images, setImages] = useState([]);

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

  // Mock data structure for DJs compatible with ImageGrid
  const mockDJs = [
    {
      id: 1,
      title: "DJ Shadow",
      description: "Master of underground beats.",
      images: [
        {
          url: "https://myphotostorage.blob.core.windows.net/mymakerphotos/a15aa0b9-127e-4089-81f2-090d2adcd862.jpg",
          alt: "DJ Shadow",
        },
        {
          url: "https://myphotostorage.blob.core.windows.net/mymakerphotos/06f053e0-65a7-48f4-870c-e7e5a75c1110.jpg",
          alt: "DJ Shadow Performance",
        },
      ],
    },
    {
      id: 2,
      title: "Neon Beats",
      description: "Futuristic vibes and neon rhythms.",
      images: [
        {
          url: "https://myphotostorage.blob.core.windows.net/mymakerphotos/91028cc5-b14f-4a47-b4b2-f01ef4d5496b.jpg",
          alt: "Neon Beats",
        },
        {
          url: "https://myphotostorage.blob.core.windows.net/mymakerphotos/7fd3953c-2be8-4b6e-a14f-3b272a3b33d0.jpg",
          alt: "Neon Beats Live",
        },
      ],
    },
  ];

  // Simulate fetching images
  useEffect(() => {
    const allImages = mockDJs.flatMap((dj) => dj.images);
    setImages(allImages);
  }, []);

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
          src="https://myphotostorage.blob.core.windows.net/mymakerphotos/9c3df2a7-c1f9-47e4-9c42-010a74ccc92b.jpeg"
          alt="DJs Cover"
          loading="lazy"
        />
      </div>

      <div className="djs-top-bar">
        <h1 className="djs-title">Perform at Makerspace</h1>
        <p className="djs-description">
          Become a part of Tbilisi's vibrant music scene. Makerspace is the hub
          for emerging and established DJs looking to showcase their talent.
          Whether you spin underground beats or mainstream hits, our venue
          offers the perfect stage.
        </p>
      </div>

      <div className="djs-stage-image-wrapper">
        <img
          className="djs-stage-image stage-1"
          src="https://myphotostorage.blob.core.windows.net/mymakerphotos/31bf474b-1b6d-4cbd-b525-7e96924de72f.jpeg"
          alt="DJs Cover"
          loading="lazy"
        />
        <img
          className="djs-stage-image stage-2"
          src="https://myphotostorage.blob.core.windows.net/mymakerphotos/54373832-23cf-4c23-bd2a-7cdc23d13277.jpeg"
          alt="DJs Cover"
          loading="lazy"
        />
      </div>

      <section className="djs-contact">
        <section className="djs-contact-heading">
          <h2 className="djs-contact-title">Interested in Performing?</h2>
          <p className="djs-contact-description">
            Ready to take the stage? Submit your details below, and our team
            will get in touch to discuss your set. Let's make your performance
            unforgettable!
          </p>
          <h2>See you on the dance floor!</h2>
        </section>

        <section className="djs-contact-form">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Stage Name"
              value={stageName}
              onChange={(e) => setStageName(e.target.value)}
              required
            />
            <input
              type="url"
              placeholder="Social Network Link"
              value={socialLink}
              onChange={(e) => setSocialLink(e.target.value)}
              required
            />
            <input
              type="url"
              placeholder="Music Platform Link"
              value={musicLink}
              onChange={(e) => setMusicLink(e.target.value)}
              required
            />
            <textarea
              placeholder="Share your motivation to play at Makerspace..."
              value={motivation}
              onChange={(e) => setMotivation(e.target.value)}
              required
            ></textarea>
            <button type="submit" disabled={loading}>
              {loading ? "Submitting..." : "Submit"}
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
            For direct inquiries, reach us at +995 577 900 061.
            <br />
            Or email us at{" "}
            <a href="mailto:contact@makerspaceclub.com">contact@makerspaceclub.com</a>
          </p>
        </section>
      </section>
    </div>
  );
};

export default DJs;
