import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import localImg from "../../assets/cover-art-5.jpg";
import ImageGrid from "../reusable/Image Grid/ImageGrid";

const Rentals = () => {
    const { id } = useParams();
    const [images, setImages] = useState([]);

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
        }
    ];
    // useEffect(() => {
  //     const apiUrl = 
  //         process.env.NODE_ENV === "production"
  //             ? `https://makerspace-cffwdbazgbh3ftdq.westeurope-01.azurewebsites.net/api/Rentals/${id}`
  //             : `/api/Rentals/${id}`; 

  //     fetch(apiUrl)
  //         .then((res) => {
  //             if (!res.ok) {
  //                 throw new Error(`Network response was not ok. Status: ${res.status}`);
  //             }
  //             return res.json();
  //         })
  //         .then((data) => {
  //             console.log("Fetched rentals:", data);
  //             setRentals([data]); // Set rentals as an array for mapping
  //             setLoading(false);
  //         })
  //         .catch((err) => {
  //             console.error("Error fetching rentals:", err);
              
  //             setError(err.message);
  //             setLoading(false);
  //         });
  // }, [id]);

    // UseEffect to simulate fetching data
    useEffect(() => {
        const allImages = mockRentals.flatMap(rental => rental.images);
        setImages(allImages);
    }, []);

    return (
        <div className="rentals-page">
            <div className="rentals-cover-image-wrapper">
                <img
                    className="rentals-cover-image"
                    src={"https://myphotostorage.blob.core.windows.net/mymakerphotos/e70e7838-7094-4a75-99ef-2b9ad69d3427.jpg"}
                    alt="Rentals Cover"
                />
            </div>
            <div className="rentals-top-bar">
                <h1 className="rentals-title">Host Your Event at Makerspace</h1>
                <p className="rentals-description">
                    Unlock the potential of our dynamic two-floor venue in the
                    heart of Tbilisi. Perfect for corporate functions or private
                    celebrations, our space—with its dance stage, chill-out
                    zones, and versatile bars—is designed to leave a lasting
                    impression. Ready to make your event unforgettable?
                </p>
            </div>
            <section className="rentals-main-container">
                <ImageGrid images={images} />
            </section>
            <section className="rentals-contact">
                <section className="rentals-contact-heading">
                <h2 className="rentals-contact-title">
                    Interested in renting our space?
                </h2>
                <p className="rentals-contact-description">
                    Fill out the form to get in touch with our team and
                    discuss your event requirements. We look forward to helping
                    you create a memorable experience at Makerspace!
                </p>
                <h2>Thank you for your interest!</h2>
                </section>
            <section className="rentals-contact-form">
                <form>
                    <input type="text" placeholder="Your Name" required />
                    <input type="email" placeholder="Your Email" required />
                    <textarea
                        placeholder="Tell us about your event"
                        required
                    ></textarea>
                    <button type="submit">Submit</button>
                </form>
                <p className="rentals-contact-info">
                    For immediate assistance, call us at +995 555 555 555.
                    <br />
                    Or email us at
                    <a href="mailto:jTz0u@example.com">jTz0u@example.com</a>
                </p>
            </section>
            </section>
        </div>
    );
};

export default Rentals;