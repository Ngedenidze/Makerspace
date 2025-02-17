import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Carousel from "./SpecialsCarousel";
import SpecialCard from "./CardInfo/SpecialCard";

export default function Specials() {
  // State for events
  const [events, setEvents] = useState([]);
  // Optional: track loading & errors
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // ---- MOCK DATA FOR DEVELOPMENT ----
    const mockData = [
      {
        id: 1,
        weekday: "Saturday",
        date: "01.02.2025",
        djName: "ROOTRHYME + BEQA",
      },
      {
        id: 2,
        weekday: "Friday",
        date: "07.02.2025",
        djName: "LEVI LOVE DISCO",
      },
      {
        id: 3,
        weekday: "Saturday",
        date: "08.02.2025",
        djName: "RASHIO",
      },
      {
        id: 4,
        weekday: "Friday",
        date: "14.02.2025",
        djName: "ELENE + KASHIA",
      },
      {
        id: 5,
        weekday: "Saturday",
        date: "15.02.2025",
        djName: "TOKO K",
      },
    ];


    setTimeout(() => {
      setEvents(mockData);
      setLoading(false);
    }, 500);

    // ---- REAL API FETCH ----
    /*
    fetch("https://api.example.com/events?limit=4")
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
    <section className="events-up-next">
      <article className="events-topbar">
        <div>
          <h1>Next Up</h1>
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

      <section className="specials-carousel">
        <Carousel />
      </section>
    </section>
  );
}
