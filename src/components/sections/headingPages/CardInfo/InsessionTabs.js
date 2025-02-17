import React, { useState, useEffect } from "react";
import localImage from "../../../../assets/art-cover.jpg";

export default function InsessionTabs() {
  const [stages, setStages] = useState([]);
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [image, setImage] = useState("");

 useEffect(() => {
  // New mockResponse shape
  const mockResponse = {
    stages: [
      {
        id: "main",
        title: "Starting soon",
        events: [
          { startTime: "12:00", djName: "TOKO K" },
          { startTime: "3:00", djName: "LONELINESSF2" },
          { startTime: "Now", djName: "AKU" },
        ],
      },
      {
        id: "space",
        title: "Starting soon",
        events: [
          { startTime: "12:00", djName: "MINDWAVES" },
          { startTime: "3:00", djName: "TOBIASS" },
          { startTime: "Now", djName: "NEARSONIC B2B MIND WAVES" },
        ],
      },
    ],
    // image: "https://picsum.photos/600/800?random=1",
    image: localImage,
  };

  // Simulate an API call
  setTimeout(() => {
    setStages(mockResponse.stages || []);
    setImage(mockResponse.image || "");
    setLoading(false);
  }, 500);

  // If you have a real API, uncomment and adjust accordingly:
  /*
  fetch("https://api.example.com/stages")
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Network response was not ok. Status: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      setStages(data.stages || []);
      setImage(data.image || "");
      setLoading(false);
    })
    .catch((err) => {
      setError(err.message);
      setLoading(false);
    });
  */
}, []);


  if (loading) return <p>Loading stages...</p>;
  if (error) return <p>Error: {error}</p>;
  if (stages.length === 0) return <p>No stage data available.</p>;

  const activeStage = stages[activeStageIndex];

  return (
    <section className="in-session">
      <div className="in-session-box">
        <article className="in-session-text">
          <h1>{activeStage.title}</h1>
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
          <img src={image} alt="In Session" />
        </section>
      </div>
    </section>
  );
}
