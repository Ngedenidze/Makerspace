import React from "react";
import "./ImageGrid.css"; 

function ImageGrid({ images }) {
  const defaultImage = {
    // shecvale
    url: "https://picsum.photos/200/300", 
    alt: "Default Image",
  };
  const imagesToRender = images.length > 0 ? images : [defaultImage];
  return (
    <div className="image-grid">
      {imagesToRender.map((img, idx) => (
        <div key={idx} className="image-item">
          <img src={img.url} alt={img.alt || `Image ${idx}`} loading="lazy" />
        </div>
      ))}
    </div>
    );
}

export default ImageGrid;