import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import localImg from "../../../assets/cover-art-4.jpg";
import { useTranslation } from "react-i18next";
import CartContext from "../Cart/CartContext";
import api from "../authPage/utils/AxiosInstance";
import Linkify from "react-linkify"; // Import react-linkify
import "./EventPage.css";
import i18n from "i18next"; // Import i18next for language detection

export default function EventPage() {
  const { id } = useParams();
  const { addItem } = useContext(CartContext);
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { t } = useTranslation();
  const todayMidnight = new Date();
todayMidnight.setHours(0, 0, 0, 0);

const eventDate = event ? new Date(event.startDate) : null;
const showBuySection = eventDate && eventDate >= todayMidnight;
  const currentLang = i18n.language;
  // State for ticket quantity
  const [ticketQuantity, setTicketQuantity] = useState(1);

  // Localization arrays for weekdays and months
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

  // Handler for buying a ticket
  const handleBuyTicket = () => {
    console.log("Event ID:", id);
    console.log("Ticket Quantity:", ticketQuantity);

    api
      .get("/Cart/my-cart")
      .then(() => {
        return api.post(
          `/Cart/add-ticket?eventId=${Number(id)}&quantity=${ticketQuantity}`
        );
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
        // No alert—UI (like a badge) could update automatically from your CartContext.
      })
      .catch((error) => {
        console.error("Ticket reservation error:", error);
      });
  };

  return (
    <div className="event-page">
      <div className="event-image-wrapper">
        <img
          className="event-image"
          src={event?.eventPhotoUrl || localImg}
          alt={event?.name || "Default"}
          loading="lazy"
          onError={({ currentTarget }) => {
            // prevent infinite loop in case localImg also errors
            currentTarget.onerror = null;
            currentTarget.src = localImg;
          }}
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
              <h1 className="event-title">
                {currentLang === "ka" ? event.name : event.nameLat}
              </h1>
            </header>
            <section className="event-lineups">
              {Object.entries(groupedLineUps).map(([floorName, lineUps]) => (
                <div key={floorName} className="lineup-floor">
                  <h3 className="floor-name">{floorName}</h3>
                  <ul className="lineups-list">
                    {lineUps.map((lineUp) => (
                      <li key={lineUp.id} className="lineup-item">
                        <div className="lineup-flex">
                          <span className="lineup-artist">
                            {lineUp.isHeaderLineUp ? (
                              <strong>{lineUp.artistName}</strong>
                            ) : (
                              lineUp.artistName
                            )}
                          </span>
                          <span className="lineup-time">
                            {" "}
                            {" - "}
                            {new Date(lineUp.startTime).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: false,
                            })}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
          {showBuySection && (
              <section className="buy-ticket-section">
              <div className="ticket-price">
                {t("price")}:{" "}
                {event.price != null
                  ? new Intl.NumberFormat(
                      currentLang === "ka" ? "ka-GE" : "en-US",
                      { style: "currency", currency: "USD" }
                    ).format(event.price)
                  : t("n_a")}
              </div>
              <div className="ticket-quantity">
                <label htmlFor="ticketQuantity">Buy Tickets:</label>
                <div
                  className={`quantity-minus ${
                    ticketQuantity === 1 ? "disabled" : ""
                  }`}
                  onClick={() => {
                    if (ticketQuantity > 1) {
                      setTicketQuantity((q) => q - 1);
                    }
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <g fill="none" fill-rule="evenodd">
                      <path fill="none" d="M0 0H24V24H0z"></path>
                      <path
                        fill="currentColor"
                        d="M18 11c.552 0 1 .448 1 1s-.448 1-1 1H6c-.552 0-1-.448-1-1s.448-1 1-1h12z"
                      ></path>
                    </g>
                  </svg>
                </div>
                <input
                  id="ticketQuantity"
                  type="number"
                  readOnly
                  className="ticket-quantity-input"
                  value={ticketQuantity}
                  onChange={(e) =>
                    setTicketQuantity(parseInt(e.target.value, 10) || 1)
                  }
                />
                <div
                  className="quantity-plus"
                  onClick={() => setTicketQuantity((q) => q + 1)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <g fill="none" fill-rule="evenodd">
                      <path fill="none" d="M0 0H24V24H0z"></path>
                      <path
                        fill="currentColor"
                        d="M12 5c.552 0 1 .448 1 1v5h5c.552 0 1 .448 1 1s-.448 1-1 1h-5v5c0 .552-.448 1-1 1s-1-.448-1-1v-5H6c-.552 0-1-.448-1-1s.448-1 1-1h5V6c0-.552.448-1 1-1z"
                      ></path>
                    </g>
                  </svg>
                </div>
                <button className="buy-ticket-button" onClick={handleBuyTicket}>
                  Add to Cart
                </button>
              </div>
              </section>
            )}
            </section>
            <section className="event-description">
              {/* Wrap description in Linkify to auto‑detect URLs */}
              <p className="description-text">
                <Linkify
                  componentDecorator={(decoratedHref, decoratedText, key) => (
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={decoratedHref}
                      key={key}
                      style={{ color: "teal" }}
                    >
                      {decoratedText}
                    </a>
                  )}
                >
                  {currentLang === "en"
                    ? event.descriptionLat
                    : event.description}
                </Linkify>
              </p>
            </section>
          </>
        )}
      </section>
    </div>
  );
}
