import React, { useState, useEffect } from "react";
import localImg from "./gallery.jpg";
import "./Gallery.css";

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(null);

  // New mock data: every image is now a separate event with its own id.
  const mockEvents = [
    {
      id: 1,
      url: "https://myphotostorage.blob.core.windows.net/mymakerphotos/a15aa0b9-127e-4089-81f2-090d2adcd862.jpg",
      alt: "DJ Shadow",
    },
    {
      id: 2,
      url: "https://myphotostorage.blob.core.windows.net/mymakerphotos/06f053e0-65a7-48f4-870c-e7e5a75c1110.jpg",
      alt: "DJ Shadow Performance",
    },
    {
      id: 3,
      url: "https://myphotostorage.blob.core.windows.net/mymakerphotos/91028cc5-b14f-4a47-b4b2-f01ef4d5496b.jpg",
      alt: "Neon Beats",
    },
    {
      id: 4,
      url: "https://myphotostorage.blob.core.windows.net/mymakerphotos/ed66d953-48ca-4fba-bc72-d2409613039b.jpeg",
      alt: "Neon Beats Live",
    },
    {
      id: 5,
      url: "https://myphotostorage.blob.core.windows.net/mymakerphotos/bd69a397-cf8b-4ee4-bd98-c4c6e0fd4f73.jpeg",
      alt: "Neon Beats Live",
    },
    {
      id: 6,
      url: "https://myphotostorage.blob.core.windows.net/mymakerphotos/ed66d953-48ca-4fba-bc72-d2409613039b.jpeg",
      alt: "Neon Beats Live",
    },
  ];

  // On component mount, set images from the mockEvents array.
  useEffect(() => {
    setImages(mockEvents);
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

  return (
    <div className="gallery-page">
      <div className="gallery-image-wrapper">
        <img
          className="gallery-cover-image"
          src={localImg}
          alt="Gallery Cover"
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
        <div className="image-grid">
          {images.map((img, index) => (
            <div key={img.id} className="image-grid-item">
              <img src={img.url} alt={img.alt} onClick={() => openModal(index)} />
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
            alt={images[activeImageIndex].alt}
          />
          {/* <div className="modal-caption">{images[activeImageIndex].alt}</div> */}
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
