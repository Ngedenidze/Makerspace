import React from "react";
import { Link } from "react-router-dom";
import Carousel from "./SpecialsCarousel";
import SpecialCard from "./CardInfo/SpecialCard";

export default function SoonEvents({ events }) {
  // Normalize the events: if an item has a nested "event" property, use it.
  const normalizedEvents = events.map(item => item.event ? item.event : item);

  if (!normalizedEvents || normalizedEvents.length === 0) {
    return (
      <div>
        <h2>No events found</h2>
      </div>
    );
  }

  const displayedEvents = normalizedEvents.slice(0, 4);
  return (
    <>
      <section className="events-soon">
        <article className="events-topbar">
          <div>
            <h1>Coming Soon</h1>
          </div>
        </article>
        <section className="events-cards">
          {displayedEvents.map((event) => {
            const startDate = new Date(event.startDate);
            const weekday = startDate.toLocaleDateString("en-US", { weekday: "long" });
            const date = startDate.toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            });
            const djName = event.lineUps?.length ? event.lineUps[0].artistName : event.name;
            return (
              <SpecialCard
                key={event.id}
                weekday={weekday}
                date={date}
                djName={djName}
                link={`/Events/${event.id}`}
              />
            );
          })}
        </section>
      </section>
    </>
  );
}
