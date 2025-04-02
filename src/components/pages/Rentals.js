import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import localImg from "../../assets/cover-art-5.jpg";
import ImageGrid from "../reusable/Image Grid/ImageGrid";
import { useTranslation } from "react-i18next";

const Rentals = () => {
    const { id } = useParams();
    const [images, setImages] = useState([]);
    const { t, i18n } = useTranslation();
    // State for form fields
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [eventDescription, setEventDescription] = useState("");

    // State for handling loading, error, and success messages
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // Mock data structure for rentals compatible with ImageGrid
    const mockRentals = [
        {
            id: 1,
            title: "Rental Space",
            description: "High-quality sound system for events.",
            images: [
                {
                    url: "https://myphotostorage.blob.core.windows.net/mymakerphotos/9f957364-a118-4eae-89cd-8e91e71b3d45.jpg",
                    alt: "Rental space 1"
                },
                {
                    url: "https://myphotostorage.blob.core.windows.net/mymakerphotos/31c24eb2-69f6-4439-8997-ca4cc733e307.jpg",
                    alt: "Rental Space 2"
                }
            ]
        },
        {
            id: 2,
            title: "Rental Space",
            description: "Perfect for outdoor parties and gatherings.",
            images: [
                {
                    url: "https://myphotostorage.blob.core.windows.net/mymakerphotos/4f7a89f9-c149-4d94-84cd-7054403b7272.jpg",
                    alt: "Rental Space 1"
                },
                {
                    url: "https://myphotostorage.blob.core.windows.net/mymakerphotos/e13915dc-3af2-43d6-a696-29a6f20958a8.jpg",
                    alt: "Rental Space 2"
                }
            ]
        },
        {
            id: 3,
            title: "Rental Space",
            description: "Perfect for outdoor parties and gatherings.",
            images: [
                {
                    url: "https://myphotostorage.blob.core.windows.net/mymakerphotos/f058fba1-ac14-4458-8977-0b8e1f654938.jpeg",
                    alt: "Rental Space 1"
                },
                {
                    url: "https://myphotostorage.blob.core.windows.net/mymakerphotos/ed65ac52-9430-4bcb-8c9f-500011188ac0.jpeg",
                    alt: "Rental Space 2"
                }
            ]
        }
    ];

    useEffect(() => {
        const allImages = mockRentals.flatMap(rental => rental.images);
        setImages(allImages);
    }, []);

    // Submit handler that concatenates form data into a string, posts it, and handles responses
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Clear previous messages
        setError("");
        setSuccess("");
        setLoading(true);

        // Create the form data string
        const formDataString = `Name: ${name}||Email: ${email}||Event Description: ${eventDescription}`;
        console.log("Form Data String:", formDataString);

        // Determine the API URL based on the environment
        const apiUrl = process.env.NODE_ENV === "production"
            ? "https://makerspace-cffwdbazgbh3ftdq.westeurope-01.azurewebsites.net/api/email/ClientContactToEmail"
            : "/api/email/ClientContactToEmail";

        try {
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                // Send the formDataString as a JSON string literal
                body: JSON.stringify(formDataString)
            });

            // Get the content type from the response headers
            const contentType = response.headers.get("content-type") || "";

            if (!response.ok) {
                // If the content type is JSON, parse it as JSON; otherwise, as text
                const errorData = contentType.includes("application/json")
                    ? await response.json()
                    : await response.text();
                throw new Error(`Error ${response.status}: ${typeof errorData === "object" ? JSON.stringify(errorData) : errorData}`);
            }

            // Parse the response based on content type
            const responseData = contentType.includes("application/json")
                ? await response.json()
                : await response.text();

            console.log("Submission successful:", responseData);
            setSuccess("Your message has been sent successfully!");
            // Optionally clear form fields upon success
            setName("");
            setEmail("");
            setEventDescription("");
        } catch (err) {
            console.error("Error submitting form:", err);
            setError("Failed to send your message. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="rentals-page">
            <div className="rentals-cover-image-wrapper">
                <img
                    className="rentals-cover-image"
                    src="https://myphotostorage.blob.core.windows.net/mymakerphotos/e70e7838-7094-4a75-99ef-2b9ad69d3427.jpg"
                    alt="Rentals Cover"
                    loading="lazy"
                />
            </div>
            <div className="rentals-top-bar">
                <h1 className="rentals-title">{t('rental_title')}</h1>
                <p className="rentals-description">
                   {t('rental_info')}
                </p>
            </div>
            <section className="rentals-main-container">
                <ImageGrid images={images} />
            </section>
            <section className="rentals-contact">
                <section className="rentals-contact-heading">
                    <h2 className="rentals-contact-title">
                      {t('rental_form_title')}
                    </h2>
                    <p className="rentals-contact-description">
                       {t('rental_form_description')}
                    </p>
                    <h2>{t('rental_form_thank_you')}</h2>
                </section>
                <section className="rentals-contact-form">
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder={t('rental_form_name')}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                        <input
                            type="email"
                            placeholder={t('rental_form_email')}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <textarea
                            placeholder={t('rental_form_event_description')}
                            value={eventDescription}
                            onChange={(e) => setEventDescription(e.target.value)}
                            required
                        ></textarea>
                        <button type="submit" disabled={loading} >
                            {loading ? t('rental_form_submitting') : t('rental_form_submit')}
                        </button>
                    </form>
                    {/* Display error or success messages */}
                    {error && (
                        <p className="error-message" style={{ color: "red", marginTop: "1rem" }}>
                            {error}
                        </p>
                    )}
                    {success && (
                        <p className="success-message" style={{ color: "green", marginTop: "1rem" }}>
                            {success}
                        </p>
                    )}
                    <p className="rentals-contact-info">
                        {t('contact_info_sub')} +995 577 900 061 
                        {t('contact_email_sub')}
                        <a href="mailto:contact@makerspaceclub.com">
                        contact@makerspaceclub.com
                        </a>
                    </p>
                </section>
            </section>
        </div>
    );
};

export default Rentals;
