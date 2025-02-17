import React, { useRef, useState, useEffect } from "react";
import Heading from "../sections/headingPages/Heading";
import Specials from "../sections/headingPages/Specials";
import Testimonials from "../sections/headingPages/Testimonials";
import Insession from "../sections/headingPages/Insession";
import About from "../sections/headingPages/About";
import ImageGrid from "../reusable/Image Grid/ImageGrid";

export default function Homepage() {

  const [images, setImages] = useState([]);
  const inSessionRef = useRef(null);
  const specialsRef = useRef(null);
  const testimonialsRef = useRef(null);
  const aboutRef = useRef(null);

  // fetch images once on mount
  useEffect(() => {
    fetch("https://api.example.com/merch")
      .then((response) => response.json())
      .then((data) => setImages(data))
      .catch((error) => console.error("Error fetching images:", error));
  }, []);

  return (
    <>
      <main>
        <section className="homepage">
          <section className="homepage-main-content">
            <section ref={inSessionRef} className="in-session">
              <Insession />
            </section>

            <section ref={specialsRef} className="events">
              <Specials />
            </section>

            <section ref={testimonialsRef} className="events">
              <Testimonials />
            </section>

            <section className="merch-display">
              <ImageGrid images={images} />
            </section>

            <section ref={aboutRef}>
              <About />
            </section>
          </section>
        </section>
      </main>
    </>
  );
}
