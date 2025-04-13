import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import localImg from "../../../assets/cover-art-4.jpg";
import { useTranslation } from "react-i18next";
import CartContext from "../Cart/CartContext";
import api from "../authPage/utils/AxiosInstance";
import "./EventPage.css";

export default function EventPage() {
  const { id } = useParams();
  const { addItem } = useContext(CartContext);
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { t } = useTranslation();

  // New state for ticket quantity
  const [ticketQuantity, setTicketQuantity] = useState(1);

  // Define keys for localization of weekdays and months.
  const weekdayKeys = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];
  const monthKeys = [
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december",
  ];

  useEffect(() => {
    api
      .get(`/Events/${id}`)
      .then((res) => {
        setEvent(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching event:", err);
        setError(err.response?.data?.message || err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading event...</p>;

  // Group lineups by floor.
  const groupLineUpsByFloor = (lineUps) => {
    return lineUps.reduce((acc, lineUp) => {
      const floorName = lineUp.floor === 1 ? t("main_stage") : t("space_stage");
      if (!acc[floorName]) acc[floorName] = [];
      acc[floorName].push(lineUp);
      return acc;
    }, {});
  };

  const groupedLineUps = event ? groupLineUpsByFloor(event.lineUps) : {};

  // Format event start date.
  let formattedDate = "";
  if (event) {
    const startDate = new Date(event.startDate);
    const weekdayKey = weekdayKeys[startDate.getDay()];
    const monthKey = monthKeys[startDate.getMonth()];
    const day = startDate.getDate();
    const year = startDate.getFullYear();
    const time = startDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    formattedDate = `${t(`weekdays.${weekdayKey}`)} ${t(
      `months.${monthKey}`
    )} ${day}, ${year} ${t("starts_at")} ${time}`;
  }

  // Updated handler for buying a ticket using BoG's payment system workflow.
  const handleBuyTicket = () => {
    console.log("Event ID:", id);
    console.log("Ticket Quantity:", ticketQuantity);
  
    api
      .get("/Cart/my-cart")
      .then(() => {
        // Pass eventId and quantity as query parameters per Swagger definition.
        return api.post(`/Cart/add-ticket?eventId=${Number(id)}&quantity=${ticketQuantity}`);
      })
      .then((addTicketRes) => {
        addItem({
          eventId: id,
          ticketId: addTicketRes.data.ticketId,
          eventName: event.name,
          price: event.price || "N/A",
          image: event.eventPhotoUrl,
          description: event.description,
          quantity: ticketQuantity,
          date: formattedDate,
        });
        alert(
          "Ticket reserved! Check your cart to proceed to payment. Ticket ID: " +
            addTicketRes.data.ticketId
        );
      })
      .catch((error) => {
        console.error("Ticket reservation error:", error);
        alert("Error reserving ticket.");
      });
  };
  

  return (
    <div className="event-page">
      <div className="event-image-wrapper">
        <img
          className="event-image"
          src={event ? event.eventPhotoUrl : localImg}
          alt={event ? event.name : "Default"}
          loading="lazy"
        />
      </div>
      <section className="event-info">
        {error ? (
          <header className="event-header">
            <h1 className="event-title">There is no upcoming event</h1>
          </header>
        ) : (
          <>
            <section className="event-dates">
              <p className="start-date">{formattedDate}</p>
            </section>
            <header className="event-header">
              <h1 className="event-title">{event.name}</h1>
            </header>
            <section className="event-lineups">
              {Object.entries(groupedLineUps).map(([floorName, lineUps]) => (
                <div key={floorName} className="lineup-floor">
                  <h3 className="floor-name">{floorName}</h3>
                  <ul className="lineups-list">
                    {lineUps.map((lineUp) => (
                      <li key={lineUp.id} className="lineup-item">
                        <span className="lineup-artist">
                          {lineUp.isHeaderLineUp ? (
                            <strong>{lineUp.artistName} </strong>
                          ) : (
                            lineUp.artistName
                          )}
                        </span>{" "}
                        -{" "}
                        <span className="lineup-time">
                          {new Date(lineUp.startTime).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>
            <section className="event-description">
              <p className="description-text">{event.description}</p>
            </section>
            {/* Quantity selection */}
            <section className="ticket-quantity-section">
              <label htmlFor="ticketQuantity">Quantity:</label>
              <input
                id="ticketQuantity"
                type="number"
                min="1"
                // Adjust max here as needed; e.g. remove or increase if more than 2 tickets can be bought.
                max="2"
                value={ticketQuantity}
                onChange={(e) =>
                  setTicketQuantity(parseInt(e.target.value, 10) || 1)
                }
              />
            </section>
            {/* Buy Ticket button */}
            <section className="buy-ticket-section">
              <button className="buy-ticket-button" onClick={handleBuyTicket}>
                Add to Cart
              </button>
            </section>
          </>
        )}
      </section>
    </div>
  );
}
