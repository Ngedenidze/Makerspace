import React from "react";
import { Link } from "react-router-dom";
import SpecialCard from "../CardInfo/SpecialCard";
import { useTranslation } from "react-i18next";

export default function EventsGrid({ events }) {
  const { t } = useTranslation();

  if (!events || events.length === 0) {
    return (
      <div>
        <h2>{t("no_events_found")}</h2>
      </div>
    );
  }

  const displayedEvents = events.slice(0, 4);

  // Define arrays mapping index values to keys in your translation file
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
    <section className="events-soon">
      <article className="events-topbar">
        <section className="events-topbar-title">
          <Link to="/AllEvents">
            <h1>{t("next_up")}</h1>
          </Link>
        </section>
        <section className="events-topbar-button">
        <Link to="/AllEvents" className="view-more">
  <strong className="chevron">&gt;&gt;</strong>
</Link>
        </section>
      </article>

      <section className="events-cards">
        {displayedEvents.map((event) => {
          const startDate = new Date(event.startDate);
          // Get the index-based weekday and month keys
          const weekdayKey = weekdayKeys[startDate.getDay()];
          const monthKey = monthKeys[startDate.getMonth()];
          const day = startDate.getDate();
          const year = startDate.getFullYear();

          // Translate the weekday and month using your i18n keys
          const translatedWeekday = t(`weekdays.${weekdayKey}`);
          const translatedMonth = t(`months.${monthKey}`);

          // Build a formatted date string (e.g. "March 15, 2025")
          const translatedDate = `${translatedMonth} ${day}, ${year}`;

          return (
            <SpecialCard
              key={event.id}
              weekday={translatedWeekday}
              date={translatedDate}
              eventName={event.name}
              link={`/Events/${event.id}`}
            />
          );
        })}
      </section>
    </section>
  );
}
