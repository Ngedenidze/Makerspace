import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
        <Link to="/AllEvents">
          <h1>{t("next_up")}</h1>
        </Link>
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
        <Link to="/AllEvents" className="view-more">
            {t("view_more")}
        </Link>
    </section>
  
    </>
  );
}
