import React, { useState, useEffect } from "react";
import localImage from "../../../../assets/art-cover.jpg";
import defaultImage from "../../../../assets/cover-art-default.jpg";

export default function InsessionTabs() {
  const [stages, setStages] = useState([]);
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [image, setImage] = useState("");

  useEffect(() => {
    const fetchAllEvents = async () => {
      try {
        const res = await fetch("/api/Events");
        if (!res.ok) {
          throw new Error(`Network response was not ok. Status: ${res.status}`);
        }
        const data = await res.json();

        // Find the FIRST event in the array that is currently in session
        const now = new Date();
        const inSessionEvent = data.find((event) => {
          const start = new Date(event.startDate);
          const end = new Date(event.endDate);
          return now >= start && now <= end;
        });

        if (inSessionEvent) {
          // Separate lineups by floor (1 = main, 2 = space, etc.)
          const mainStage = {
            id: "main",
            title: "Main Stage",
            events: inSessionEvent.lineUps
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
            events: inSessionEvent.lineUps
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
          setImage(inSessionEvent.eventPhotoUrl || localImage);
        } else {
          setError("No events currently in session.");
        }
      } catch (err) {
        console.error("Error fetching events:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAllEvents();
  }, []);

  if (loading) return <p>Loading stages...</p>;

  return (
    <section className="in-session">
      <div className="in-session-box">
        {error ? (
          <section className="default-image">
            <div className="image-wrapper">
              <img src={defaultImage} alt="Default Cover Art" />
            </div>
            <div className="text-overlay">
              <h1>MAKERSPACE</h1>
            </div>
          </section>
        ) : stages.length === 0 ? (
          <p>No stage data available.</p>
        ) : (
          <>
            <article className="in-session-text">
              <h1>In Session</h1>
              <h2>MAKERSPACE</h2>

              {/* Stage Tabs */}
              <div className="stage-tabs">
                {stages.map((stage, index) => (
                  <button
                    key={stage.id}
                    onClick={() => setActiveStageIndex(index)}
                    className={index === activeStageIndex ? "active" : ""}
                  >
                    {stage.id.toUpperCase()}
                  </button>
                ))}
              </div>

              {/* Display the events for the active stage */}
              {stages[activeStageIndex].events.map((evt, idx) => (
                <div key={idx} className="in-session-timestamps">
                  <h3>
                    {evt.startTime} {evt.djName}
                  </h3>
                </div>
              ))}
            </article>

            {/* Event Image */}
            <section className="in-session-image">
              <img src={localImage} alt="In Session" />
            </section>
          </>
        )}
      </div>
    </section>
  );
}
