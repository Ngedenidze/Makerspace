// InsessionTabs.js
import React, { useState, useEffect } from "react";
import localImage from "../../../../assets/art-cover.jpg";
import { Link } from "react-router-dom";

export default function InsessionTabs({ eventsData }) {
  const [stages, setStages] = useState([]);
  const [eventID, setEventID] = useState("");
  const [eventStatus, setEventStatus] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    if (!eventsData || eventsData.length === 0) return;
    const now = new Date();

    // Find the first upcoming event
    const upcomingEvent = eventsData
      .filter((event) => new Date(event.endDate) > now)
      .sort((a, b) => new Date(a.startDate) - new Date(b.startDate))[0];

    if (upcomingEvent) {
      const start = new Date(upcomingEvent.startDate);
      const end = new Date(upcomingEvent.endDate);

      if (now < start) {
        setEventStatus("Starting Soon");
      } else if (now >= start && now <= end) {
        setEventStatus("In Session");
      } else {
        setEventStatus("Ended");
      }

      const mainStage = {
        id: "main",
        title: "Main Stage",
        events: upcomingEvent.lineUps
          .filter((lineUp) => lineUp.floor === 1)
          .map((lineUp) => ({
            startTime: new Date(lineUp.startTime).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
            djName: lineUp.artistName,
          })),
      };

      const spaceStage = {
        id: "space",
        title: "Space Stage",
        events: upcomingEvent.lineUps
          .filter((lineUp) => lineUp.floor === 2)
          .map((lineUp) => ({
            startTime: new Date(lineUp.startTime).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
            djName: lineUp.artistName,
          })),
      };

      setStages([mainStage, spaceStage]);
      setEventID(upcomingEvent.id);
      setImage(upcomingEvent.eventPhotoUrl || localImage);
    }
  }, [eventsData]);

  if (!eventsData || stages.length === 0)
    return <p>No stage data available.</p>;

  return (
    <section className="in-session">
      <div className="in-session-box">
        <article className="in-session-text">
          <h1>{eventStatus}</h1>
          <div className="in-session-stages">
            {stages.map((stage, stageIndex) => (
              <div className="stage" key={stage.id}>
                <h2>{stage.title}</h2>
                {stage.events?.map((evt, evtIndex) => (
                  <Link
                    key={`${stageIndex}-${evtIndex}`}
                    to={`/Events/${eventID}`}
                    className="in-session-timestamps"
                  >
                    <h3>
                      {evt.startTime} {evt.djName}
                    </h3>
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </article>
        <section className="in-session-image">
          <img src={image} alt="In Session" />
        </section>
      </div>
    </section>
  );
}
