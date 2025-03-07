import React, { useState, useEffect } from "react";
import localImage from "../../../../assets/art-cover.jpg";
import defaultImage from "../../../../assets/cover-art-default.jpg";

export default function InsessionTabs() {
  const [stages, setStages] = useState([]);
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [image, setImage] = useState("");
  const [eventStatus, setEventStatus] = useState("");
  
  useEffect(() => {
    const apiUrl =
      process.env.NODE_ENV === "production" 
        ? "https://makerspace-cffwdbazgbh3ftdq.westeurope-01.azurewebsites.net/api/Events"
        : "/api/Events"; // still use proxy in dev

    const fetchAllEvents = async () => {
      try {
        const res = await fetch(apiUrl);
        if (!res.ok) {
          throw new Error(`Network response was not ok. Status: ${res.status}`);
        }
        const data = await res.json();

        // Get the current time
        const now = new Date();

        // Find the FIRST upcoming event by sorting and checking the start date
        const upcomingEvent = data
          .filter((event) => new Date(event.endDate) > now) // Filter events that haven't ended yet
          .sort((a, b) => new Date(a.startDate) - new Date(b.startDate))[0]; // Get the closest one

        if (upcomingEvent) {
          const start = new Date(upcomingEvent.startDate);
          const end = new Date(upcomingEvent.endDate);

          // Determine the status of the event
          if (now < start) {
            setEventStatus("Coming Soon");
          } else if (now >= start && now <= end) {
            setEventStatus("In Session");
          } else {
            setEventStatus("Ended");
          }

          // Separate lineups by floor (1 = main, 2 = space, etc.)
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
          setImage(upcomingEvent.eventPhotoUrl || localImage);
        } else {
          setError("No upcoming or in-session events.");
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
              <img src={"https://myphotostorage.blob.core.windows.net/mymakerphotos/bf080f0e-a1fb-430c-998d-cc336ace2fcd.jpg"} alt="Default Cover Art" />
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
              <h1>{eventStatus}</h1> {/* Display Event Status */}

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
              <img src={image} alt="In Session" />
            </section>
          </>
        )}
      </div>
    </section>
  );
}
