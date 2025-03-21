import React, { useState, useEffect } from "react";
import localImg from "./gallery.jpg";
import "./Gallery.css";

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(null);
  // State to track whether each image in the grid has loaded
  const [loadedImages, setLoadedImages] = useState({});

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(
          "https://makerspace-cffwdbazgbh3ftdq.westeurope-01.azurewebsites.net/api/google-drive/images"
        );
        const data = await response.json();
        console.log(data);
        // Directly set images from the API response
        setImages(data.images || []);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);

  // Open modal on image click
  const openModal = (index) => {
    setActiveImageIndex(index);
    setModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setModalOpen(false);
    setActiveImageIndex(null);
  };

  // Navigate to previous image
  const prevImage = (e) => {
    e.stopPropagation();
    setActiveImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  // Navigate to next image
  const nextImage = (e) => {
    e.stopPropagation();
    setActiveImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Handle image load to remove blur placeholder
  const handleImageLoad = (index) => {
    setLoadedImages((prev) => ({ ...prev, [index]: true }));
  };

  return (
    <div className="gallery-page">
      <div className="gallery-image-wrapper">
        {/* Using picture element for responsive cover image */}
        <picture>
          {/* Replace with an optimized WebP if available */}
          <source srcSet={localImg} type="image/webp" />
          <img
            className="gallery-cover-image"
            src={localImg}
            alt="Gallery Cover"
            loading="lazy"
          />
        </picture>
      </div>
      <div className="gallery-top-bar">
        <h1 className="gallery-title">Gallery of Makerspace</h1>
        <p className="gallery-description">
          Welcome to the makerspace gallery! Check out our collection of creative
          projects and inspiring ideas from our members.
        </p>
      </div>
      <section className="gallery-main-container">
        <div className="image-grid">
          {images.map((img, index) => (
            <div key={index} className="image-grid-item">
              <img
                src={img.url}
                alt={img.name}
                onClick={() => openModal(index)}
                loading="lazy"
                onLoad={() => handleImageLoad(index)}
                className={`grid-image ${loadedImages[index] ? "loaded" : "loading"}`}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Modal for zooming and scrolling images */}
      {modalOpen && activeImageIndex !== null && (
        <div className="modal" onClick={closeModal}>
          <span className="close" onClick={closeModal}>
            &times;
          </span>
          <img
            className="modal-content"
            src={images[activeImageIndex].url}
            alt={images[activeImageIndex].name}
          />
          <button className="prev" onClick={prevImage}>
            &#10094;
          </button>
          <button className="next" onClick={nextImage}>
            &#10095;
          </button>
        </div>
      )}
    </div>
  );
};

export default Gallery;
