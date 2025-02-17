import React, { useRef, useState, useEffect } from "react";
import Heading from "../sections/headingPages/Heading";
import Specials from "../sections/headingPages/Specials";
import Testimonials from "../sections/headingPages/Testimonials";
import Insession from "../sections/headingPages/Insession";
import About from "../sections/headingPages/About";

// Import your ImageGrid component
import ImageGrid from "../reusable/Image Grid/ImageGrid";

export default function Homepage() {
  // State to hold fetched images
  const [images, setImages] = useState([]);

  // Refs for each section
  const inSessionRef = useRef(null);
  const specialsRef = useRef(null);
  const testimonialsRef = useRef(null);
  const aboutRef = useRef(null);

  // Example: fetch images once on mount
  useEffect(() => {
    fetch("https://api.example.com/merch")
      .then((response) => response.json())
      .then((data) => setImages(data))
      .catch((error) => console.error("Error fetching images:", error));
  }, []);

  // Scroll behavior for the "About" button
  const handleAboutClick = () => {
    aboutRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Optionally, create more scroll handlers if your Heading has multiple links
  const scrollToSpecials = () => {
    specialsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
   
      <main className="main">
        <section className="homepage">
          {/* Pass scroll handlers to Heading if needed */}
          <Heading scrollToSpecials={scrollToSpecials} scrollToAbout={handleAboutClick} />

          <section className="homepage-main-content">
            {/* In Session Section */}
            <section ref={inSessionRef} className="in-session">
              <Insession />
            </section>

            {/* Specials Section */}
            <section ref={specialsRef} className="events">
              <Specials />
            </section>

            {/* Testimonials Section */}
            <section ref={testimonialsRef} className="events">
              <Testimonials />
            </section>
            {/* Merchandise Section */}
            <section className="merch-display">
              <ImageGrid images={images} />
            </section>

            {/* About Section */}
            <section ref={aboutRef}>
              <About />
            </section>
          </section>
        </section>
      </main>
    </>
  );
}
