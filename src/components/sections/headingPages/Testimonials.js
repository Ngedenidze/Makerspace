import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Carousel from "./SpecialsCarousel";
import SpecialCard from "./CardInfo/SpecialCard";

export default function Testimonials() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  {/* TODO: AXIOSIT GAAKETE AN trpc.project.list.useQuery()*/ }
  // Fetch events from the API
  useEffect(() => {
    // ---- MOCK DATA FOR DEVELOPMENT ----
    const mockData = [
      {
        id: 10,
        weekday: "Friday",
        date: "21.02.2025",
        djName: "MARK CHEZ",
      },
      {
        id: 11,
        weekday: "Saturday",
        date: "22.02.2025",
        djName: "DJ Name",
      },
      {
        id: 12,
        weekday: "Friday",
        date: "28.02.2025",
        djName: "GIO SHENGELIA B2B TOMA",
      },
      {
        id: 13,
        weekday: "Saturday",
        date: "29.02.2025",
        djName: "BEBUR",
      },
      {
        id: 14,
        weekday: "Friday",
        date: "06.03.2025",
        djName: "SPECIAL GUEST",
      },
    ];

    setTimeout(() => {
      setEvents(mockData);
      setLoading(false);
    }, 500);

    // ---- REAL API FETCH ----
    /*
    fetch("https://api.example.com/testimonials?limit=4")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Network response was not ok. Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        // 'data' should be an array of event objects
        setEvents(data.slice(0, 4)); // ensure only 4
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
    */
  }, []);


  if (loading) return <p>Loading events...</p>;
  if (error) return <p>Error: {error}</p>;


  const displayedEvents = events.slice(0, 4);

  return (
    <section className="events-soon">
      <article className="events-topbar">
        <div>
          <h1>Soon</h1>
        </div>
      </article>

      <section className="events-cards">
        {displayedEvents.map((event) => (
          <SpecialCard
            key={event.id}
            weekday={event.weekday}
            date={event.date}
            djName={event.djName}
            link={`/event-details/${event.id}`}
          />
        ))}
      </section>

      <section className="testimonials-carousel">
        <Carousel />
      </section>
    </section>
  );
}
