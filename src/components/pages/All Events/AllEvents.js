import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import localImg from "../../../assets/cover-art-default.jpg";
import SpecialSlice from "../../reusable/CardInfo/SpecialSlice";
import { useTranslation } from "react-i18next";
import i18n from "i18next"; // Import i18next for language detection
import Loader from "../../reusable/Loader/Loader";
import { use } from "react";

export default function Events() {
  const { tab } = useParams(); // e.g. "upcoming" or "past"
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [events, setEvents] = useState([]);
  const [pastEventsData, setPastEventsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 const currentLang = i18n.language; // e.g. "en" or "ka"
  // Use the environment variable; if using CRA, use process.env.REACT_APP_API_URL instead.
  const apiBaseUrl = process.env.REACT_APP_API_URL; 

  const validTabs = ["upcoming", "past"];
  const defaultTab = "upcoming";

  const initialTab = validTabs.includes(tab) ? tab : defaultTab;
  const [activeTab, setActiveTab] = useState(initialTab);

  useEffect(() => {
    if (tab && !validTabs.includes(tab)) {
      navigate(`/AllEvents/${defaultTab}`, { replace: true });
    } else if (tab && validTabs.includes(tab)) {
      setActiveTab(tab);
    } else {
      setActiveTab(defaultTab);
    }
  }, [tab, navigate, validTabs]);

  useEffect(() => {
    // Build events URL using the env variable. In production we use the API URL from env,
    // otherwise use the local endpoint.
    const eventsUrl =
      process.env.NODE_ENV === "production"
        ? `${apiBaseUrl}/api/Events`
        : "/api/Events/AllEvents";

    fetch(eventsUrl)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Network response was not ok. Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setEvents(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setEvents([]);
        setLoading(false);
      });
  }, [apiBaseUrl]);

  useEffect(() => {
     const pastEventsUrl =
      process.env.NODE_ENV === "production"
        ? `${apiBaseUrl}/api/Events/PastEvents`
        : "/api/Events/PastEvents";

    fetch(pastEventsUrl).then((res) => {
    if (!res.ok) {
      throw new Error(`Network response was not ok. Status: ${res.status}`);
    }
    return res.json();
  }).then((data) => {
     setPastEventsData(data);
     setLoading(false);
    })
  .catch((err) => {
    setError(err.message);
    setPastEventsData([]);
    setLoading(false); });
  },  []);

  if (loading) return <p><Loader /></p>;
  if (error) return <p>Error: {error}</p>;

  const now = new Date();
  const upcomingEvents = events.filter((e) => new Date(e.startDate) >= now - 6 * 60 * 60 * 1000); // Filter events that are upcoming
  const pastEvents = pastEventsData || [];

  // Mapping arrays for translating numeric day/month values
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

  // Format event data using translation keys for weekday and month
  const formatEventData = (event) => {
    const start = new Date(event.startDate);
  const day   = start.getDate();
  const year  = start.getFullYear();

  // look up your keys…
  const weekdayKey = weekdayKeys[start.getDay()];
  const monthKey   = monthKeys[start.getMonth()];

  // translate them…
  const weekday = t(`weekdays.${weekdayKey}`);
  const month   = t(`months.${monthKey}`);

  // pick the right date format per locale
  const datePart = currentLang === "en"
    ? `${month} ${day}, ${year}`
    : `${day} ${month}, ${year}`;

  // format the time once
  const time = start.toLocaleTimeString("en-GB", {
    hour:   "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  // build the final string
  const formattedDate =  `${weekday}, ${datePart} ${t("starts_at")} ${time}`;
    const stages = Object.entries(
      event.lineUps?.reduce((acc, lineUp) => {
        const stageKey = lineUp.floor;
        if (!acc[stageKey]) {
          acc[stageKey] = [];
        }
        acc[stageKey].push(lineUp.artistName);
        return acc;
      }, {}) || {}
    );

    return { formattedDate, stages };
  };

  const renderEvents = (list) => {
    return list.map((event) => {
      const { formattedDate, stages } = formatEventData(event);
      return (
        <SpecialSlice
          key={event.id}
          weekday={formattedDate}
          eventName={event.nameLat}
          stages={stages}
          link={`/Events/${event.id}`}
        />
      );
    });
  };

  return (
    <div className="all-events-page">
      <div className="all-events-image-wrapper">
        <img
          className="all-events-image"
          src={localImg}
          alt="Default Cover"
          loading="lazy"
        />
      </div>

      <div className="tabs">
        <button
          className={activeTab === "upcoming" ? "active" : ""}
          onClick={() => navigate("/AllEvents/upcoming")}
        >
          {t("coming_soon")}
        </button>
        <button
          className={activeTab === "past" ? "active" : ""}
          onClick={() => navigate("/AllEvents/past")}
        >
          {t("past_events")}
        </button>
      </div>

      <section className="events-grid">
        {activeTab === "upcoming" && (
          <section className="events-slices">
            {renderEvents(upcomingEvents)}
          </section>
        )}
        {activeTab === "past" && (
          <section className="events-slices">
            {renderEvents(pastEvents)}
          </section>
        )}
      </section>
    </div>
  );
}
