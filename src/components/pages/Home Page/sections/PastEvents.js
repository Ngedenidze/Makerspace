import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SpecialCard from "../../../reusable/CardInfo/SpecialCard";
import { useTranslation } from "react-i18next";
export default function PastEvents({ events }) {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language; // e.g. "en" or "ka"

  if (!events || events.length === 0) {
    return;
  }

  const displayedEvents = events.slice(0, 4);
  const weekdayKeys = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];
  const monthKeys = [
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december",
  ];
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
          <Link to="/AllEvents/past" className="view-more">
  <strong className="chevron">&gt;&gt;</strong>
</Link>
          </section>
        </article>

        <section className="events-cards">
          {displayedEvents.map((event) => {
            if (!event || !event.startDate) return null; // skip if invalid

             const startDate = new Date(event.startDate);
          // Get the index-based weekday and month keys
          const weekdayKey = weekdayKeys[startDate.getDay()];
          const monthKey = monthKeys[startDate.getMonth()];
          const day = startDate.getDate();
          const year = startDate.getFullYear();
          const translatedWeekday = t(`weekdays.${weekdayKey}`);
          const translatedMonth = t(`months.${monthKey}`);
          const translatedDate = currentLang === "en" ? `${translatedMonth} ${day}, ${year}` : `${day} ${translatedMonth}, ${year}`;

            const eventName =
              event.lineUps?.length > 0
                ? event.nameLat
                : "Event";

            return (
              <SpecialCard
                key={event.id}
                weekday={translatedWeekday}
                date={translatedDate}
                eventName={currentLang === "ka" ? event.name : eventName}
                link={`/Events/${event.id}`}
              />
            );
          })}
        </section>
      </section>
    </>
  );
}
