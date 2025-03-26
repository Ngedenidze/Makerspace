import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Carousel from "../headingPages/SpecialsCarousel";
import SpecialCard from "../headingPages/CardInfo/SpecialCard";
import Testimonials from "../headingPages/SoonEvents";
import { useTranslation } from "react-i18next";

export default function EventsGrid({ events }) {
  const { t, i18n } = useTranslation();

  if (!events || events.length === 0) {
    return (
      <div>
        <h2>{t("no_events_found")}</h2>
      </div>
    );
  }

  const displayedEvents = events.slice(0, 4);

  return (
    <>
    <section className="events-soon">
      <article className="events-topbar">
        <section className="events-topbar-title">
          <Link to="/AllEvents">
          <h1>{t("next_up")}</h1>
        </Link></section>
        <section className="events-topbar-button"><Link to="/AllEvents" className="view-more">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-double-right" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708"/>
  <path fill-rule="evenodd" d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708"/>
</svg>
        </Link></section>
    
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

          // If lineUps exist, use the first artist name. Otherwise, fallback to event.name
          const djName = event.lineUps?.length ? event.lineUps[0].artistName : event.name;

          return (
            <SpecialCard
              key={event.id}
              weekday={weekday}
              date={date}
              eventName={event.name}
              link={`/Events/${event.id}`}
            />
          );
        })}
      </section>
   
    </section>
  
    </>
  );
}
