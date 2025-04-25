import React from "react";
import { Link } from "react-router-dom";
import SpecialCard from "../../../reusable/CardInfo/SpecialCard";
import { useTranslation } from "react-i18next";
import i18n from "i18next"; // Import i18n for language detection

export default function SoonEvents({ events }) {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language; // e.g. "en" or "ka"
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
           <section className="events-topbar-title">
                      <div>
                        <Link to="/AllEvents/upcoming">
                          <h1>{t("coming_soon")}</h1>
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
          <section className="events-topbar-title">
            <Link to="/AllEvents">
              <div>
                <h1>{t("coming_soon")}</h1>
              </div>
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
            // Use the event.startDate if available, else default to null.
            const startDate = event.startDate
              ? new Date(event.startDate)
              : null;
            const weekdayKey = weekdayKeys[startDate.getDay()];

            const monthKey = monthKeys[startDate.getMonth()];
            const day = startDate.getDate();
            const year = startDate.getFullYear();
            const translatedWeekday = t(`weekdays.${weekdayKey}`);
            const translatedMonth = t(`months.${monthKey}`);
            const translatedDate = currentLang === "en" ? `${translatedMonth} ${day}, ${year}` : `${day} ${translatedMonth}, ${year}`;
            const date = startDate
              ? translatedDate
              : "TBD";
            // Use the first artistName from lineUps if available, otherwise check event.name, and fallback to "TBD"
            const djName =
              event.lineUps && event.lineUps.length > 0
                ? event.lineUps[0].artistName
                : event.nameLat || "TBD";
            return (
              <SpecialCard
                key={event.id || "placeholder-" + Math.random()}
                weekday={translatedWeekday}
                date={event.lineUps && event.lineUps.length > 0 ? date : "TBD"}
                eventName={currentLang == "ka" ? event.name : event.nameLat}
                link={`/Events/${event.id}`}
              />
            );
          })}
        </section>
      </section>
    </>
  );
}
