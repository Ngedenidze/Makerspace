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
      url: "https://myphotostorage.blob.core.windows.net/mymakerphotos/a98e8d28-5796-46cd-83c0-5e9ff6cd67c5.jpg",
      alt: "Raw image 1",
    },
    {
      id: 2,
      url: "https://myphotostorage.blob.core.windows.net/mymakerphotos/6b1cde09-87db-41dd-b867-6b8cdc429c79.jpg",
      alt: "Raw image 2",
    },
    {
      id: 7,
      url: "https://myphotostorage.blob.core.windows.net/mymakerphotos/4e3b28d0-ef54-489b-aa17-6c29294b16a5.jpg",
      alt: "Raw image 3",
    },
    {
      id: 8,
      url: "https://myphotostorage.blob.core.windows.net/mymakerphotos/8f21b35a-b13c-4232-8f0d-ded29972acb5.jpg",
      alt: "Raw image 4",
    },
    {
      id: 9,
      url: "https://myphotostorage.blob.core.windows.net/mymakerphotos/9a8cd166-795a-4150-b3c0-d7568df275e9.jpg",
      alt: "Raw image 5",
    },
    {
      id: 10,
      url: "https://myphotostorage.blob.core.windows.net/mymakerphotos/8f3208dd-8ad7-4fd5-88b8-3ec77b8a5e6b.jpg",
      alt: "Raw image 6",
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
          <div className="modal-caption">{images[activeImageIndex].alt}</div>
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
