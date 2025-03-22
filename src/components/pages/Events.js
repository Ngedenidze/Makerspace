import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import localImg from "../../assets/cover-art-default.jpg";
import SpecialSlice from "../sections/headingPages/CardInfo/SpecialSlice";

export default function Events() {
  const { tab } = useParams();        // <-- e.g. "upcoming" or "past"
  const navigate = useNavigate();

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    const apiUrl =
      process.env.NODE_ENV === "production"
        ? "https://makerspace-cffwdbazgbh3ftdq.westeurope-01.azurewebsites.net/api/Events"
        : "/api/Events/AllEvents";

    fetch(apiUrl)
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
        console.error("Error fetching events:", err);
        setError(err.message);
        setEvents([]);
        setLoading(false);
      });
  }, []);

  const {
    data: pastEventsData,
    isLoading: pastLoading,
    error: pastError,
  } = useQuery("pastEvents", async () => {
    const apiUrl =
      process.env.NODE_ENV === "production"
        ? "https://makerspace-cffwdbazgbh3ftdq.westeurope-01.azurewebsites.net/api/PastEvents"
        : "/api/Events/PastEvents";
  
    const res = await fetch(apiUrl);
    if (!res.ok) {
      throw new Error(`Network error: ${res.status}`);
    }
    const data = await res.json();
    return data;
  });

  if (loading) return <p>Loading event...</p>;
  if (error) return <p>Error: {error}</p>;


  const now = new Date();
  const upcomingEvents = events.filter((e) => new Date(e.startDate) >= now);
  const pastEvents = pastEventsData || [];

  const formatEventData = (event) => {
    const startDate = new Date(event.startDate);
    const weekday = startDate.toLocaleDateString("en-US", { weekday: "long" });
    const date = startDate.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    const time = startDate.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    const formattedDate = `${weekday} ${date} starts at ${time}`;

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
          eventName={event.name}
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
          Coming Soon
        </button>
        <button
          className={activeTab === "past" ? "active" : ""}
          onClick={() => navigate("/AllEvents/past")}
        >
          Past Events
        </button>
      </div>

      <section className="events-grid">
        {activeTab === "upcoming" && (
          <section className="events-slices">
            {renderEvents(upcomingEvents)}
          </section>
        )}
        {activeTab === "past" && (
          <section className="events-slices">{renderEvents(pastEvents)}</section>
        )}
      </section>
    </div>
  );
}
