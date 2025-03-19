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
  const [eventsData, setEventsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Define refs for sections
  const specialsRef = useRef(null);
  const aboutRef = useRef(null);

  useEffect(() => {
    const apiUrl =
      process.env.NODE_ENV === "production"
        ? "https://makerspace-cffwdbazgbh3ftdq.westeurope-01.azurewebsites.net/api/Events"
        : "/api/Events";

    fetch(apiUrl)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Network error: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setEventsData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching events:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []); // no onLoaded dependency

  if (loading) return <div></div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <main>
      <section className="homepage">
        <section className="homepage-main-content">
          {/* Pass the preloaded data to InsessionTabs */}
          <InsessionTabs eventsData={eventsData} />

          <section ref={specialsRef} className="events">
            {/* Pass the same events data to Specials */}
            <Specials events={eventsData} />
          </section>

          {/*
          <section ref={testimonialsRef} className="events">
            <Testimonials />
          </section>
          */}

          {/*
          <section className="merch-display">
            <ImageGrid images={images} />
          </section>
          */}

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
  );
}
