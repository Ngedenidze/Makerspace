import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Carousel from "./SpecialsCarousel";
import SpecialCard from "./CardInfo/SpecialCard";

export default function Specials() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/api/Events")
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Network response was not ok. Status: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      console.log("Fetched events:", data); 
      setEvents(data);
      setLoading(false);
    })
    .catch((err) => {
      setError(err.message);
      setLoading(false);
    });
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
        {displayedEvents.map((event) => {
          // Convert startDate into a Date object for formatting
          const startDate = new Date(event.startDate);
          const weekday = startDate.toLocaleDateString("en-US", { weekday: "long" });
          const date = startDate.toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          });

          // Use the first lineup’s artist name as djName
          const djName = event.lineUps?.length ? event.lineUps[0].artistName : event.name;

          return (
            <SpecialCard
              key={event.id}
              weekday={weekday}
              date={date}
              djName={djName}
              link={`/event/${event.id}`}
            />
          );
        })}
      </section>

      <section className="specials-carousel">
        <Carousel />
      </section>
    </section>
  );
}
