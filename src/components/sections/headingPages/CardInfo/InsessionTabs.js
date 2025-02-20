import React, { useState, useEffect } from "react";
import localImage from "../../../../assets/art-cover.jpg";

export default function InsessionTabs() {
  const [stages, setStages] = useState([]);
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [image, setImage] = useState("");

  useEffect(() => {
    {/*
      TODO: FIX IF NOT IN SESSION TO FETCH THE IMAGES*/}
      
    const fetchEvent = async (eventId) => {
      try {
        const res = await fetch(`/api/Events/${eventId}`);
        if (!res.ok) {
          throw new Error(`Network response was not ok. Status: ${res.status}`);
        }
        const data = await res.json();
        return data;
      } catch (err) {
        return null;
      }
    };

    const fetchFirstAvailableEvent = async () => {
      let eventId = 1;
      let eventData = null;

      while (!eventData && eventId <= 10) { // Adjust the upper limit as needed
        eventData = await fetchEvent(eventId);
        eventId++;
      }

      if (eventData) {
        const mainStage = {
          id: "main",
          title: "Main Stage",
          events: eventData.lineUps.filter(lineUp => lineUp.floor === 1).map(lineUp => ({
            startTime: new Date(lineUp.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            djName: lineUp.artistName
          }))
        };

        const spaceStage = {
          id: "space",
          title: "Space Stage",
          events: eventData.lineUps.filter(lineUp => lineUp.floor === 2).map(lineUp => ({
            startTime: new Date(lineUp.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            djName: lineUp.artistName
          }))
        };

        setStages([mainStage, spaceStage]);
        setImage(eventData.eventPhotoUrl || localImage);
      } else {
        setError("No events found.");
      }
      setLoading(false);
    };

    fetchFirstAvailableEvent();
  }, []);

  if (loading) return <p>Loading stages...</p>;
  if (error) return <p>Error: {error}</p>;
  if (stages.length === 0) return <p>No stage data available.</p>;

  const activeStage = stages[activeStageIndex];

  return (
    <section className="in-session">
      <div className="in-session-box">
        <article className="in-session-text">
          <h1>In Session</h1>
          <h2>MAKERSPACE</h2>
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

          {activeStage.events.map((evt, idx) => (
            <div key={idx} className="in-session-timestamps">
              <h3>
                {evt.startTime} {evt.djName}
              </h3>
            </div>
          ))}
        </article>
        <section className="in-session-image">
          {/* TODO:   Use the image from the event data */}
          <img src={localImage} alt="In Session" />
        </section>
      </div>
    </section>
  );
}
