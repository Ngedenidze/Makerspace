import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import localImg from "../../assets/cover-art-5.jpg";
import ImageGrid from "../reusable/Image Grid/ImageGrid";

const DJs = () => {
  const { id } = useParams();
  const [images, setImages] = useState([]);

  // Mock data structure for DJs compatible with ImageGrid
  const mockDJs = [
    {
      id: 1,
      title: "DJ Shadow",
      description: "Master of underground beats.",
      images: [
        {
          url: require("../../assets/DJs/dj-1.jpg"),
          alt: "DJ Shadow",
        },
        {
          url: require("../../assets/DJs/dj-2.jpg"),
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
          url: require("../../assets/DJs/dj-3.jpg"),
          alt: "Neon Beats",
        },
        {
          url: require("../../assets/DJs/dj-4.jpg"),
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
    <div className="djs-page">
      <div className="djs-cover-image-wrapper">
        <img className="djs-cover-image" src={localImg} alt="DJs Cover" />
      </div>

      <div className="djs-top-bar">
        <h1 className="djs-title">Perform at Makerspace</h1>
        <p className="djs-description">
          Become a part of Tbilisi's vibrant music scene. Makerspace is the hub
          for emerging and established DJs looking to showcase their talent.
          Whether you spin underground beats or mainstream hits, our venue
          offers the perfect stage.
        </p>
      </div>

      <section className="djs-main-container">
        <ImageGrid images={images} />
      </section>

      <section className="djs-contact">
        <section className="djs-contact-heading">
          <h2 className="djs-contact-title">Interested in Performing?</h2>
          <p className="djs-contact-description">
            Ready to take the stage? Submit your details below, and our team
            will get in touch to discuss your set. Let's make your performance
            unforgettable!
          </p>
          <h2>See you on the dance floor!</h2>
        </section>

        <section className="djs-contact-form">
          <form>
            <input type="text" placeholder="Full Name" required />
            <input type="text" placeholder="Stage Name" required />
            <input type="url" placeholder="Social Network Link" required />
            <input
              type="url"
              placeholder="Music Platform Link"
              required
            />
            <textarea
              placeholder="Share your motivation to play at Makerspace..."
              required
            ></textarea>
            <button type="submit">Submit</button>
          </form>

          <p className="djs-contact-info">
            For direct inquiries, reach us at +995 555 555 555.
            <br />
            Or email us at{" "}
            <a href="mailto:djs@example.com">djs@example.com</a>
          </p>
        </section>
      </section>
    </div>
  );
};

export default DJs;
