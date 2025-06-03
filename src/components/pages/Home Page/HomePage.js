import React, { useRef } from "react";
import { useQuery } from "react-query";
import EventsGrid from "../../reusable/Events Grid/EventsGrid";
import InsessionTabs from "../../reusable/CardInfo/InSessionTabs";
import CommercialRenting from "./sections/CommercialRenting";
import DJBooking from "../DJ Booking/DJBooking";
import About from "../About/About";
import PastEvents from "./sections/PastEvents";
import SoonEvents from "./sections/SoonEvents";

export default function Homepage() {
  const specialsRef = useRef(null);
  const aboutRef = useRef(null);
  const apiBaseUrl = process.env.REACT_APP_API_URL;
  // Fetch events data
  const {
    data: eventsData,
    isLoading: eventsLoading,
    error: eventsError,
  } = useQuery("events", async () => {
    const apiUrl =
      process.env.NODE_ENV === "production"
        ? `${apiBaseUrl}/api/Events`
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
        ? `${apiBaseUrl}/api/SoonEvents`
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
        ? `${apiBaseUrl}/api/Events/PastEvents`
        : "/api/Events/PastEvents";
    const res = await fetch(apiUrl);
    if (!res.ok) {
      throw new Error(`Network error: ${res.status}`);
    }
    const data = await res.json();
    // Map the soon events array to extract the inner event objects
    return data;
  });
  const now = new Date();
  const sixHoursAgo = now.getTime() - 6 * 60 * 60 * 1000;
  const nextUpEvents = Array.isArray(eventsData)
    ? eventsData.filter((e) => {
        const startMs = new Date(e.startDate).getTime();
        return startMs >= sixHoursAgo;
      })
    : [];
  return (
    <main>
      <section className="homepage">
        <section className="homepage-main-content">
          <InsessionTabs eventsData={eventsData} />

          <section ref={specialsRef} className="events">
            <EventsGrid events={nextUpEvents} />
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
