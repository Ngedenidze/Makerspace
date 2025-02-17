import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Events() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data again (or fetch from real API)
    const mockData = [
      { id: 1, weekday: "Saturday", date: "01.02.2025", djName: "ROOTRHYME + BEQA" },
      { id: 2, weekday: "Friday", date: "07.02.2025", djName: "LEVI LOVE DISCO" },
      { id: 3, weekday: "Saturday", date: "08.02.2025", djName: "RASHIO" },
      { id: 4, weekday: "Friday", date: "14.02.2025", djName: "ELENE + KASHIA" },
      { id: 5, weekday: "Saturday", date: "15.02.2025", djName: "TOKO K" },
    ];

    setTimeout(() => {
      const foundEvent = mockData.find((evt) => evt.id === parseInt(id, 10));
      setEvent(foundEvent || null);
      setLoading(false);
    }, 500);

    // For a real API:
    /*
    fetch(`https://api.example.com/events/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setEvent(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
    */
  }, [id]);

  if (loading) return <p>Loading event details...</p>;
  if (!event) return <p>Event not found.</p>;

  return (
    <div>
      <h1>Event Details</h1>
      <p>Weekday: {event.weekday}</p>
      <p>Date: {event.date}</p>
      <p>DJ Name: {event.djName}</p>
    </div>
  );
}
