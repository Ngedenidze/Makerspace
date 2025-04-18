import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SpecialCard from "../../../reusable/CardInfo/SpecialCard";
import { useTranslation } from "react-i18next";
export default function PastEvents({ events }) {
  const { t, i18n } = useTranslation();
  if (!events || events.length === 0) {
    return;
  }

  const displayedEvents = events.slice(0, 4);

  return (
    <>
      <section className="events-soon">
        <article className="events-topbar">
          <section className="events-topbar-title">
            <div>
              <Link to="/AllEvents/past">
                <h1>{t("past_events")}</h1>
              </Link>
            </div>
          </section>
          <section className="events-topbar-button">
          <Link to="/AllEvents" className="view-more">
  <strong className="chevron">&gt;&gt;</strong>
</Link>
          </section>
        </article>

        <section className="events-cards">
          {displayedEvents.map((event) => {
            if (!event || !event.startDate) return null; // skip if invalid

            const startDate = new Date(event.startDate);
            const weekday = startDate.toLocaleDateString("en-US", {
              weekday: "long",
            });
            const date = startDate.toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            });

            const eventName =
              event.lineUps?.length > 0
                ? event.name
                : "Event";

            return (
              <SpecialCard
                key={event.id}
                weekday={weekday}
                date={date}
                eventName={eventName}
                link={`/Events/${event.id}`}
              />
            );
          })}
        </section>
      </section>
    </>
  );
}
