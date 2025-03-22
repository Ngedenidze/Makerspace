import React, { useRef } from "react";
import { useQuery } from "react-query";
import Specials from "../sections/eventProfile/EventsGrid";
import InsessionTabs from "../sections/headingPages/CardInfo/InSessionTabs";
import CommercialRenting from "./CommercialRenting";
import DJBooking from "./DJBooking";
import About from "../sections/headingPages/About";
import PastEvents from "../sections/headingPages/PastEvents";
import SoonEvents from "../sections/headingPages/SoonEvents";

export default function Homepage() {
  const specialsRef = useRef(null);
  const aboutRef = useRef(null);

  // Fetch events data
  const {
    data: eventsData,
    isLoading: eventsLoading,
    error: eventsError,
  } = useQuery("events", async () => {
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

  // Fetch soon events data and transform it by extracting the nested event object
  const {
    data: soonEventsData,
    isLoading: soonLoading,
    error: soonError,
  } = useQuery("soonEvents", async () => {
    const apiUrl =
      process.env.NODE_ENV === "production"
        ? "https://makerspace-cffwdbazgbh3ftdq.westeurope-01.azurewebsites.net/api/SoonEvents"
        : "/api/SoonEvents";
    const res = await fetch(apiUrl);
    if (!res.ok) {
      throw new Error(`Network error: ${res.status}`);
    }
    const data = await res.json();
    // Map the soon events array to extract the inner event objects
    return data.map((item) => item.event);
  });
  const {
    data: pastEventsData,
    isLoading: pastLoading,
    error: pastError,
  } = useQuery("pastEvents", async () => {
    const apiUrl =
      process.env.NODE_ENV === "production"
        ? "https://makerspace-cffwdbazgbh3ftdq.westeurope-01.azurewebsites.net/api/SoonEvents"
        : "/api/Events/PastEvents";
    const res = await fetch(apiUrl);
    if (!res.ok) {
      throw new Error(`Network error: ${res.status}`);
    }
    const data = await res.json();
    // Map the soon events array to extract the inner event objects
    return data;
  });
  

  if (eventsError) return <div>Error: {eventsError.message}</div>;
  if (soonError) return <div>Error: {soonError.message}</div>;
  if (pastError) return <div>Error: {pastError.message}</div>;

  return (
    <main>
      <section className="homepage">
        <section className="homepage-main-content">
          <InsessionTabs eventsData={eventsData} />

          <section ref={specialsRef} className="events">
            <Specials events={eventsData} />
          </section>
          <section className="events">
            <SoonEvents events={soonEventsData} />
          </section>
          <section className="events">
            <PastEvents events={pastEventsData} />
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
