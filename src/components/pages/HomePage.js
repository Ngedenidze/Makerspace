import React, { useRef } from "react";
import Heading from "../sections/headingPages/Heading";
import Specials from "../sections/headingPages/Specials";
import Testimonials from "../sections/headingPages/Testimonials";
import Insession from "../sections/headingPages/Insession";
import About from "../sections/headingPages/About";

export default function Homepage() {
  const specialsRef = useRef(null);
  const aboutRef = useRef(null);
  const handleAboutClick = () => {
    aboutRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <>
      
      <main className="homepage">
        <Heading scrollToSpecials={specialsRef} scrollToAbout={handleAboutClick} />
        <section ref={specialsRef} className="in-session">
          <Insession />
        </section>
        <section ref={specialsRef} className="events">
        <Specials />
        </section>
        <section ref={specialsRef} className="events">
        <Testimonials />
        </section>
        {/* <section ref={aboutRef}>
          <About />
        </section> */}
      </main>
    </>
  );
}