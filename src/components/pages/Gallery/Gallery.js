import React, { useState, useEffect } from "react";
import localImg from "./gallery.jpg";
import "./Gallery.css";
import ImageGrid from "../../reusable/Image Grid/ImageGrid";

const Gallery = () => {
    const [images, setImages] = useState([]);
    
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
    
      // UseEffect to simulate fetching data
      useEffect(() => {
        const allImages = mockDJs.flatMap((dj) => dj.images);
        setImages(allImages);
      }, []);

    return (
        <div className="gallery-page">
            <div className="gallery-image-wrapper">
                <img
                    className="gallery-cover-image"
                    src={localImg}
                    alt="Gallery"
                />
            </div>
            <div className="gallery-top-bar">
        <h1 className="gallery-title">Gallery of makerspace</h1>
        <p className="gallery-description">
          Welcome to the makerspace gallery! Check out our collection of creative
          projects and inspiring ideas from our members.
        </p>
      </div>
      <section className="gallery-main-container">
        <ImageGrid images={images} />
    </section>


        </div>

    )
};

export default Gallery;