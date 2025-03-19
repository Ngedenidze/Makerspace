import React, { useRef } from "react";
import { useQuery } from "react-query";
import Specials from "../sections/eventProfile/EventsGrid";
import InsessionTabs from "../sections/headingPages/CardInfo/InSessionTabs";
import CommercialRenting from "./CommercialRenting";
import DJBooking from "./DJBooking";
import About from "../sections/headingPages/About";

export default function Homepage() {
  // Define refs for sections if needed
  const specialsRef = useRef(null);
  const aboutRef = useRef(null);

  // Use React Query to fetch and cache events data
  const { data: eventsData, isLoading, error } = useQuery("events", async () => {
    const apiUrl =
      process.env.NODE_ENV === "production"
        ? "https://makerspace-cffwdbazgbh3ftdq.westeurope-01.azurewebsites.net/api/Events"
        : "/api/Events";

    const res = await fetch(apiUrl);
    if (!res.ok) {
      throw new Error(`Network error: ${res.status}`);
    }
    return res.json();
  });

  if (isLoading) return <div>Loading homepage data...</div>;
  if (error) return <div>Error: {error.message}</div>;

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
