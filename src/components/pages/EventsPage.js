import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import localImg from "../../assets/cover-art-4.jpg";
import { useTranslation } from "react-i18next";

export default function EventsPage() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    const apiUrl =
      process.env.NODE_ENV === "production"
        ? "https://makerspace-cffwdbazgbh3ftdq.westeurope-01.azurewebsites.net/api/Events"
        : "/api/Events";
    fetch(`${apiUrl}/${id}`)
      .then((res) => {
        if (!res.ok) {
          console.error("Error fetching event:", res.statusText);
          throw new Error(`Network response was not ok. Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setEvent(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching event:", err);
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading event...</p>;

  // Function to group lineups by floor
  const groupLineUpsByFloor = (lineUps) => {
    return lineUps.reduce((acc, lineUp) => {
      const floorName = lineUp.floor === 1 ? t("main_stage") : t("space_stage");
      if (!acc[floorName]) acc[floorName] = [];
      acc[floorName].push(lineUp);
      return acc;
    }, {});
  };

  // If event data is available, group the lineups by floor
  const groupedLineUps = event ? groupLineUpsByFloor(event.lineUps) : {};

  // Build a translated date string
  const startDate = new Date(event.startDate);
  // Define mapping arrays (keys must match your translation file)
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
  const weekdayKey = weekdayKeys[startDate.getDay()];
  const monthKey = monthKeys[startDate.getMonth()];
  const day = startDate.getDate();
  const year = startDate.getFullYear();
  const translatedWeekday = t(`weekdays.${weekdayKey}`);
  const translatedMonth = t(`months.${monthKey}`);
  const time = startDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  // "starts_at" should be defined in your translation files (e.g., "starts at")
  const formattedDate = `${translatedWeekday} ${translatedMonth} ${day}, ${year} ${t(
    "starts_at"
  )} ${time}`;

  return (
    <div className="event-page">
      <div className="event-image-wrapper">
        <img
          className="event-image"
          src={event ? event.eventPhotoUrl : localImg}
          alt={event ? event.name : "Default"}
        />
      </div>
      <section className="event-info">
        {error ? (
          <header className="event-header">
            <h1 className="event-title">There is no upcoming event</h1>
          </header>
        ) : (
          <>
            <section className="event-dates">
              <p className="start-date">{formattedDate}</p>
            </section>
            <header className="event-header">
              <h1 className="event-title">{event.name}</h1>
            </header>
            <section className="event-lineups">
              {Object.entries(groupedLineUps).map(([floorName, lineUps]) => (
                <div key={floorName} className="lineup-floor">
                  <h3 className="floor-name">{floorName}</h3>
                  <ul className="lineups-list">
                    {lineUps.map((lineUp) => (
                      <li key={lineUp.id} className="lineup-item">
                        <span className="lineup-artist">
                          {lineUp.isHeaderLineUp ? (
                            <strong>{lineUp.artistName}</strong>
                          ) : (
                            lineUp.artistName
                          )}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>
            <section className="event-description">
              <p className="description-text">{event.description}</p>
            </section>
          </>
        )}
      </section>
    </div>
  );
}
