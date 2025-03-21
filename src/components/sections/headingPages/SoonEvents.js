import React from "react";
import { Link } from "react-router-dom";
import Carousel from "./SpecialsCarousel";
import SpecialCard from "./CardInfo/SpecialCard";
import { useTranslation } from "react-i18next";

export default function SoonEvents({ events }) {
   const { t, i18n } = useTranslation();
  // Normalize the events: if an item has a nested "event" property, use it.
  const normalizedEvents =
    events && events.length > 0
      ? events.map((item) => (item.event ? item.event : item))
      : [];

  // If no events are available, render a placeholder card.
  if (normalizedEvents.length === 0) {
    return (
      <section className="events-soon">
        <article className="events-topbar">
          <div>
            <h1>{t("coming_soon")}</h1>
          </div>
        </article>
        <section className="events-cards">
          <SpecialCard
            key="placeholder"
            weekday="TBD"
            date="TBD"
            eventName="TBD"
            link="#"
          />
        </section>
        
      </section>
    );
  }

  const displayedEvents = normalizedEvents.slice(0, 4);
  return (
    <>
    <section className="events-soon">
      <article className="events-topbar">
        <div>
          <h1>{t("coming_soon")}</h1>
        </div>
      </article>
      <section className="events-cards">
        {displayedEvents.map((event) => {
          // Use the event.startDate if available, else default to null.
          const startDate = event.startDate ? new Date(event.startDate) : null;
          const weekday = startDate
            ? startDate.toLocaleDateString("en-US", { weekday: "long" })
            : "TBD";
          const date = startDate
            ? startDate.toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })
            : "TBD";
          // Use the first artistName from lineUps if available, otherwise check event.name, and fallback to "TBD"
          const djName =
            event.lineUps && event.lineUps.length > 0
              ? event.lineUps[0].artistName
              : event.name || "TBD";
          return (
            <SpecialCard
              key={event.id || "placeholder-" + Math.random()}
              weekday={weekday}
              date={date}
              eventName={event.name}
              link={`/Events/${event.id}`}
            />
          );
        })}
      </section>
        <Link to="/AllEvents/upcoming" className="view-more">
                {t("view_more")}
        </Link>
    </section>
    </>
  );
}
