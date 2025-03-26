import React, { useState } from "react";
import "./ImageGrid.css"; 

function ImageGrid({ images }) {
  const defaultImage = {
    url: "https://picsum.photos/200/300", 
    alt: "Default Image",
  };
  const imagesToRender = images.length > 0 ? images : [defaultImage];

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(null);

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
      prevIndex === 0 ? imagesToRender.length - 1 : prevIndex - 1
    );
  };

  // Navigate to next image
  const nextImage = (e) => {
    e.stopPropagation();
    setActiveImageIndex((prevIndex) =>
      prevIndex === imagesToRender.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <>
      <div className="image-grid">
        {imagesToRender.map((img, idx) => (
          <div key={idx} className="image-grid-item">
            <img 
              src={img.url} 
              alt={img.alt || `Image ${idx}`} 
              loading="lazy"
              onClick={() => openModal(idx)}
            />
          </div>
        ))}
      </div>
      {modalOpen && activeImageIndex !== null && (
        <div className="modal" onClick={closeModal}>
          <span className="close" onClick={closeModal}>&times;</span>
          <img
            className="modal-content"
            src={imagesToRender[activeImageIndex].url}
            alt={imagesToRender[activeImageIndex].alt || `Image ${activeImageIndex}`}
          />
          <button className="prev" onClick={prevImage}>
            &#10094;
          </button>
          <button className="next" onClick={nextImage}>
            &#10095;
          </button>
        </div>
      )}
    </>
  );
}

export default ImageGrid;
