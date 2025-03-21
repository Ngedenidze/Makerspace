import React, { useState, useEffect } from "react";
import localImg from "./gallery.jpg";
import "./Gallery.css";

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(null);

  // Fetch and convert Google Drive URLs to blob URLs
  const fetchImageAsBlob = async (url) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      return URL.createObjectURL(blob);
    } catch (error) {
      console.error("Error fetching image:", error);
      return null;
    }
  };

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(
          "https://makerspace-cffwdbazgbh3ftdq.westeurope-01.azurewebsites.net/api/google-drive/images"
        );
        const data = await response.json();
        
        // Convert all URLs to blob URLs
        const imagesWithBlobUrls = await Promise.all(
          (data.images || []).map(async (img) => ({
            ...img,
            url: await fetchImageAsBlob(img.url),
          }))
        );

        setImages(imagesWithBlobUrls);
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
  useEffect(() => {
    return () => {
      images.forEach((img) => {
        if (img.url) URL.revokeObjectURL(img.url);
      });
    };
  }, [images]);
  return (
    <div className="gallery-page">
      <div className="gallery-image-wrapper">
        <img
          className="gallery-cover-image"
          src={localImg}
          alt="Gallery Cover"
          loading="lazy"
        />
      </div>
      <div className="gallery-top-bar">
        <h1 className="gallery-title">Gallery of Makerspace</h1>
        <p className="gallery-description">
          Welcome to the makerspace gallery! Check out our collection of creative
          projects and inspiring ideas from our members.
        </p>
      </div>
      <section className="gallery-main-container">
      <div>
  <img
    src="https://drive.google.com/uc?export=view&id=1p8lrPy5VXhn-j1tIW9Y00DmRvQkB8gED"
    alt="Gallery"
    loading="lazy"
  />
</div>

        <div className="image-grid">
          {images.map((img, index) => (
            <div key={index} className="image-grid-item">
              {/* Use img.url for src and img.name for alt text */}
              <img
                src={img.url}
                alt={img.name}
                onClick={() => openModal(index)}
                loading="lazy"
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
