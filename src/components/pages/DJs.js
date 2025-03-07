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
    <div className="djs-page">
      <div className="djs-cover-image-wrapper">
        <img className="djs-cover-image" src={"https://myphotostorage.blob.core.windows.net/mymakerphotos/9c3df2a7-c1f9-47e4-9c42-010a74ccc92b.jpeg"} alt="DJs Cover" />
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

      <div className="djs-stage-image-wrapper">
        <img className="djs-stage-image stage-1" src={"https://myphotostorage.blob.core.windows.net/mymakerphotos/31bf474b-1b6d-4cbd-b525-7e96924de72f.jpeg"} alt="DJs Cover" />
        <img className="djs-stage-image stage-2" src={"https://myphotostorage.blob.core.windows.net/mymakerphotos/54373832-23cf-4c23-bd2a-7cdc23d13277.jpeg"} alt="DJs Cover" />
        </div>

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
