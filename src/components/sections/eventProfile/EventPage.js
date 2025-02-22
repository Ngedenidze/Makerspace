import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import localImg from "../../../assets/cover-art-4.jpg";

export default function EventPage() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
{/* TODO: AXIOSIT GAAKETE AN trpc.project.list.useQuery()*/ }
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

  return (
    <div className="event-page">
      <div className="event-image-wrapper">
        <img className="event-image" src={localImg} alt={event ? event.name : "Default"} />
      </div>
      <section className="event-info">
        {error ? (
          <header className="event-header">
            <h1 className="event-title">There is no upcoming event</h1>
          </header>
        ) : (
          <>
            <header className="event-header">
              <h1 className="event-title">{event.name}</h1>
            </header>
            <section className="event-description">
              <p className="description-text">{event.description}</p>
            </section>
            <section className="event-dates">
              <p className="start-date">
                <span className="date-label">Start Date:</span> {new Date(event.startDate).toLocaleDateString()}{" "}
                {new Date(event.startDate).toLocaleTimeString()}
              </p>
              <p className="end-date">
                <span className="date-label">End Date:</span> {new Date(event.endDate).toLocaleDateString()}{" "}
                {new Date(event.endDate).toLocaleTimeString()}
              </p>
            </section>
            <section className="event-lineups">
              <h2 className="lineups-heading">Lineups</h2>
              <ul className="lineups-list">
                {event.lineUps.map((lineUp) => (
                  <li key={lineUp.id} className="lineup-item">
                    <span className="lineup-artist">{lineUp.artistName}</span>
                    {" - "}
                    <span className="lineup-time">
                      {new Date(lineUp.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          </>
        )}
      </section>
    </div>
  );
}