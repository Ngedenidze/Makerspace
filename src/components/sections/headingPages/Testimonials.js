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
    const mockData = [
      {
        "id": 70,
        "name": "Underground Vibes",
        "description": "Deep techno night with an exclusive lineup.",
        "eventPhotoUrl": "https://example.com/underground_vibes.jpg",
        "startDate": "2025-02-21T22:00:00",
        "endDate": "2025-02-22T06:00:00",
        "lineUps": [
          {
            "id": 1001,
            "eventId": 70,
            "floor": 1,
            "artistName": "DJ Shadow",
            "startTime": "2025-02-21T23:00:00",
            "isHeaderLineUp": true
          },
          {
            "id": 1002,
            "eventId": 70,
            "floor": 1,
            "artistName": "Deep Frequencies",
            "startTime": "2025-02-22T01:00:00",
            "isHeaderLineUp": false
          }
        ]
      },
      {
        "id": 71,
        "name": "Techno Horizons",
        "description": "A journey into futuristic techno vibes.",
        "eventPhotoUrl": "https://example.com/techno_horizons.jpg",
        "startDate": "2025-03-05T22:00:00",
        "endDate": "2025-03-06T06:00:00",
        "lineUps": [
          {
            "id": 1011,
            "eventId": 71,
            "floor": 1,
            "artistName": "Synth Master",
            "startTime": "2025-03-05T23:00:00",
            "isHeaderLineUp": true
          },
          {
            "id": 1012,
            "eventId": 71,
            "floor": 2,
            "artistName": "Neon Beats",
            "startTime": "2025-03-06T01:30:00",
            "isHeaderLineUp": false
          }
        ]
      },
      {
        "id": 72,
        "name": "House Revival",
        "description": "Classic house meets modern grooves.",
        "eventPhotoUrl": "https://example.com/house_revival.jpg",
        "startDate": "2025-04-10T21:00:00",
        "endDate": "2025-04-11T05:00:00",
        "lineUps": [
          {
            "id": 1021,
            "eventId": 72,
            "floor": 1,
            "artistName": "Groove Doctor",
            "startTime": "2025-04-10T22:00:00",
            "isHeaderLineUp": true
          },
          {
            "id": 1022,
            "eventId": 72,
            "floor": 2,
            "artistName": "Vinyl Queen",
            "startTime": "2025-04-11T00:00:00",
            "isHeaderLineUp": false
          }
        ]
      },
      {
        "id": 73,
        "name": "Minimal Nights",
        "description": "Hypnotic beats and stripped-back rhythms.",
        "eventPhotoUrl": "https://example.com/minimal_nights.jpg",
        "startDate": "2025-05-01T23:00:00",
        "endDate": "2025-05-02T07:00:00",
        "lineUps": [
          {
            "id": 1031,
            "eventId": 73,
            "floor": 1,
            "artistName": "Minimal Master",
            "startTime": "2025-05-01T23:30:00",
            "isHeaderLineUp": true
          },
          {
            "id": 1032,
            "eventId": 73,
            "floor": 1,
            "artistName": "Click & Pop",
            "startTime": "2025-05-02T02:00:00",
            "isHeaderLineUp": false
          }
        ]
      },
      {
        "id": 74,
        "name": "Sunrise Session",
        "description": "Melodic house as the sun comes up.",
        "eventPhotoUrl": "https://example.com/sunrise_session.jpg",
        "startDate": "2025-06-12T00:00:00",
        "endDate": "2025-06-12T08:00:00",
        "lineUps": [
          {
            "id": 1041,
            "eventId": 74,
            "floor": 1,
            "artistName": "Morning Breeze",
            "startTime": "2025-06-12T01:00:00",
            "isHeaderLineUp": true
          },
          {
            "id": 1042,
            "eventId": 74,
            "floor": 2,
            "artistName": "Light Chasers",
            "startTime": "2025-06-12T03:00:00",
            "isHeaderLineUp": false
          }
        ]
      }
    ];

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
        setEvents(mockData);
        setLoading(false);
      });
  }, []);
  


  // if (loading) return <p>Loading events...</p>;
  // if (error) return <p>Error: {error}</p>;


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
    </section>
  );
}
