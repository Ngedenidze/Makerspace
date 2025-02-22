import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Carousel from "./SpecialsCarousel";
import SpecialCard from "./CardInfo/SpecialCard";

export default function Testimonials() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  {/* TODO: AXIOSIT GAAKETE AN trpc.project.list.useQuery()*/ }
  // Fetch events from the API
  useEffect(() => {
    const apiUrl =
      process.env.NODE_ENV === "production"
        ? "https://makerspace-cffwdbazgbh3ftdq.westeurope-01.azurewebsites.net/api/Events"
        : "/api/Events"; // still use proxy in dev
  
    fetch(apiUrl)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Network response was not ok. Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Fetched events:", data);
        setEvents(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching events:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);
  


  if (loading) return <p>Loading events...</p>;
  if (error) return <p>Error: {error}</p>;


  const displayedEvents = events.slice(0, 4);

  return (
    <section className="events-soon">
      <article className="events-topbar">
        <div>
          <h1>Soon</h1>
        </div>
      </article>

      <section className="events-cards">
        
        {displayedEvents.map((event) => {
                 const startDate = new Date(event.startDate);
                 const weekday = startDate.toLocaleDateString("en-US", { weekday: "long" });
                 const date = startDate.toLocaleDateString("en-US", {
                   month: "long",
                   day: "numeric",
                   year: "numeric",
                 });
                 const djName = event.lineUps?.length ? event.lineUps[0].artistName : event.name;

                 return (
          <SpecialCard
            key={event.id}
            weekday={weekday}
            date={date}
            djName={djName}
            link={`/Events/${event.id}`}
          />);
})}
      </section>

      <section className="testimonials-carousel">
        <Carousel />
      </section>
    </section>
  );
}
