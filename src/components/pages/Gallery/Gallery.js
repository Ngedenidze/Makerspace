import React, { useState, useEffect } from "react";
import localImg from "./gallery.jpg";
import "./Gallery.css";
import { useTranslation } from "react-i18next";

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(null);
  const [loadedImages, setLoadedImages] = useState({});
  const { t } = useTranslation();

  const apiBaseUrl = process.env.REACT_APP_API_URL;
  
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(
          `${apiBaseUrl}/api/google-drive/images?page=${currentPage}&limit=20`
        );
        const data = await response.json();
        const newImages = data.images || [];
        setImages((prev) => [...prev, ...newImages]);
        if (newImages.length < 20) setHasMore(false);
      } catch (error) {

      }
    };

    fetchImages();
  }, [currentPage]);

  const loadMoreImages = () => {
    if (hasMore) setCurrentPage((prevPage) => prevPage + 1);
  };
  const openModal = (index) => {
    setActiveImageIndex(index);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setActiveImageIndex(null);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setActiveImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const nextImage = (e) => {
    e.stopPropagation();
    setActiveImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleImageLoad = (index) => {
    setLoadedImages((prev) => ({ ...prev, [index]: true }));
  };

  return (
    <div className="gallery-page">
      <div className="gallery-image-wrapper">
        <picture>
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
        <h1 className="gallery-title">{t("gallery_title")}</h1>
        <p className="gallery-description">{t("gallery_text")}</p>
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
