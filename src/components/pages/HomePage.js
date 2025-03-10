import React, { useRef, useState, useEffect } from "react";
import Heading from "../sections/headingPages/Heading";
import Specials from "../sections/eventProfile/EventsGrid";
import Testimonials from "../sections/headingPages/Testimonials";
import Insession from "../sections/headingPages/Insession";
import About from "../sections/headingPages/About";
import ImageGrid from "../reusable/Image Grid/ImageGrid";
import CommercialRenting from "./CommercialRenting";
import DJBooking from "./DJBooking";
import InsessionTabs from "../sections/headingPages/CardInfo/InSessionTabs";

export default function Homepage() {

  const [images, setImages] = useState([]);
  const inSessionRef = useRef(null);
  const specialsRef = useRef(null);
  const testimonialsRef = useRef(null);
  const aboutRef = useRef(null);
  return (
    <>
      <main>
        <section className="homepage">
          <section className="homepage-main-content">
            <InsessionTabs />   

            <section ref={specialsRef} className="events">
              <Specials />
            </section>

            {/* <section ref={testimonialsRef} className="events">
              <Testimonials />
            </section> */}

            {/* <section className="merch-display">
              <ImageGrid images={images} />
            </section> */}
            <section>
              <CommercialRenting />
            </section>
              <section>
                <DJBooking />
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
