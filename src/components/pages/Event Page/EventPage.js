import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import localImg from "../../../assets/cover-art-4.jpg";
import { useTranslation } from "react-i18next";
import CartContext from "../Cart/CartContext";
import api from "../authPage/utils/AxiosInstance";
import Linkify from "react-linkify";
import "./EventPage.css";
import i18n from "i18next"; // You can often get i18n instance from useTranslation too
import Loader from "../../reusable/Loader/Loader";
import { toast } from "react-toastify"; // Make sure react-toastify is set up

export default function EventPage() {
  const { id } = useParams();
  const { addItem } = useContext(CartContext);
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { t } = useTranslation(); // i18n instance can be accessed via t.i18n if needed

  const todayMidnight = new Date();
  todayMidnight.setHours(0, 0, 0, 0);

  // Derived state for price and buy section visibility
  const [currentEventPrice, setCurrentEventPrice] = useState(null);
  const [showBuySection, setShowBuySection] = useState(false);

  const currentLang = i18n.language.split('-')[0]; // Get base language e.g., "en" from "en-US"

  const [ticketQuantity, setTicketQuantity] = useState(1);

  const weekdayKeys = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
  const monthKeys = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];

  useEffect(() => {
    setLoading(true);
    setError(null);
    api
      .get(`/Events/${id}`)
      .then((res) => {
        setEvent(res.data);
        console.log("Fetched Event Data:", res.data);

        // --- Price and Buy Section Logic ---
        if (res.data && res.data.baskets && res.data.baskets.length > 0) {
          // For now, use the first basket's price
          setCurrentEventPrice(res.data.baskets[0].price);
          // TODO: Implement logic for selecting among multiple baskets if res.data.baskets.length > 1
          // For example, you might set a default or allow user selection:
          // if (res.data.baskets.length > 1) {
          //   console.warn("Multiple ticket baskets found. Defaulting to the first basket's price. Implement selection logic.");
          //   // setSelectedBasket(res.data.baskets[0]); // If you have a selectedBasket state
          // }
        } else {
          setCurrentEventPrice(null); // No baskets or price info
        }

        const eventDate = new Date(res.data.startDate);
        setShowBuySection(eventDate >= todayMidnight);
        // --- End Price and Buy Section Logic ---

      })
      .catch((err) => {
        console.error("Error fetching event:", err);
        setError(err.response?.data?.message || err.message || t("error.event_fetch_generic", "Could not load event details."));
        setCurrentEventPrice(null); // Reset price on error
        setShowBuySection(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id, t]); // `todayMidnight` is stable if defined outside or correctly memoized, but it's fine here.

  if (loading) return <div className="loader-container-eventpage"><Loader /></div>; // Added a wrapper class for styling loader if needed
  // Display error message if fetching failed
  if (error) {
    return (
      <div className="event-page error-page">
        <header className="event-header">
          <h1 className="event-title">{t("error.event_load_title", "Error Loading Event")}</h1>
          <p className="error-text">{error}</p>
        </header>
      </div>
    );
  }
  // Display message if event is null after loading and no error (e.g. event not found by ID)
  if (!event) {
    return (
      <div className="event-page error-page">
        <header className="event-header">
          <h1 className="event-title">{t("error.event_not_found_title", "Event Not Found")}</h1>
          <p>{t("error.event_not_found_message", "The event you are looking for could not be found.")}</p>
        </header>
      </div>
    );
  }


  const groupLineUpsByFloor = (lineUps) => {
    return lineUps.reduce((acc, lineUp) => {
      const floorName = lineUp.floor === 1 ? t("main_stage", "Main Stage") : t("space_stage", "Space Stage");
      if (!acc[floorName]) acc[floorName] = [];
      acc[floorName].push(lineUp);
      return acc;
    }, {});
  };

  const groupedLineUps = groupLineUpsByFloor(event.lineUps || []); // Ensure lineUps is an array

  let formattedDate = t("n_a", "N/A");
  if (event.startDate) {
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
    )} ${day}, ${year} ${t("starts_at", "starts at")} ${time}`;
  }

  const handleBuyTicket = () => {
    if (currentEventPrice === null || currentEventPrice === undefined) {
      toast.error(t("error.price_not_available_cart", "Ticket price is currently not available. Cannot add to cart."));
      return;
    }
    if (ticketQuantity <= 0) {
        toast.warn(t("error.quantity_invalid", "Please select a valid ticket quantity."));
        return;
    }

    const eventNameForCart = currentLang === "ka" ? event.name : event.nameLat;
    const eventDescriptionForCart = currentLang === "ka" ? event.description : event.descriptionLat;
    const eventImageForCart = event.eventPhotoUrl || localImg;
    
    let basketIdForTicket = null;
    // TODO: When multiple baskets are supported, get the ID of the selected basket.
    // For now, assuming the first basket if available.
    if (event.baskets && event.baskets.length > 0) {
        basketIdForTicket = event.baskets[0].id;
    }

   

    // The GET /Cart/my-cart call before adding might be for validation or to ensure cart is initialized.
    // If it's not strictly necessary, you can remove it to simplify.
    api.get("/Cart/my-cart")
      .then(() => {
        // Adjust the POST endpoint if it needs basketId
        let addTicketUrl = `/Cart/add-ticket?eventId=${Number(id)}&quantity=${ticketQuantity}`;
        // if (basketIdForTicket) {
        //   addTicketUrl += `&basketId=${basketIdForTicket}`;
        // }
     
        return api.post(addTicketUrl);
      })
      .then((addTicketRes) => {
        // Assuming addTicketRes.data contains the ID of the newly created ticket/cart item
        // and potentially the confirmed price if the backend recalculates it.
        const confirmedPrice = addTicketRes.data.price !== undefined ? addTicketRes.data.price : currentEventPrice;

        addItem({
          eventId: String(event.id), // Use event.id from the event object
          ticketId: addTicketRes.data.ticketId, // This should be unique for the cart item
          eventName: eventNameForCart,
          price: confirmedPrice,
          image: eventImageForCart,
          description: eventDescriptionForCart,
          quantity: ticketQuantity,
          date: formattedDate, // This is the event start date, might just be for display in cart
          // basketId: basketIdForTicket, // Optionally store which basket this ticket is from
        });
        toast.success(t("ticket_added_to_cart", "{{quantity}} ticket(s) for {{eventName}} added to cart!", { quantity: ticketQuantity, eventName: eventNameForCart }));
        setTicketQuantity(1); // Reset quantity after adding to cart
      })
      .catch((error) => {
        console.error("Ticket reservation error:", error);
        const errorMessage = error.response?.data?.message || t("error.add_to_cart_failed", "Failed to add ticket(s) to cart. Please try again.");
        toast.error(errorMessage);
      });
  };

  const eventNameDisplay = currentLang === "ka" ? event.name : event.nameLat;
  const eventDescriptionDisplay = currentLang === "en" ? event.descriptionLat : event.description;

  return (
    <div className="event-page">
      <div className="event-image-wrapper">
        <img
          className="event-image"
          src={event.eventPhotoUrl || localImg}
          alt={eventNameDisplay || "Event Image"}
          loading="lazy"
          onError={({ currentTarget }) => {
            currentTarget.onerror = null;
            currentTarget.src = localImg;
          }}
        />
      </div>
      <section className="event-info">
        <section className="event-dates">
          <p className="start-date">{formattedDate}</p>
        </section>
        <header className="event-header">
          <h1 className="event-title">{eventNameDisplay}</h1>
        </header>
        <section className="event-lineups">
          {Object.entries(groupedLineUps).map(([floorName, lineUpsOnFloor]) => ( // Renamed lineUps to lineUpsOnFloor
            <div key={floorName} className="lineup-floor">
              <h3 className="floor-name">{floorName}</h3>
              <ul className="lineups-list">
                {lineUpsOnFloor.map((lineUp) => ( // Use lineUpsOnFloor here
                  <li key={lineUp.id} className="lineup-item">
                    <div className="lineup-flex">
                      <span className="lineup-artist">
                        {lineUp.isHeaderLineUp ? <strong>{lineUp.artistName}</strong> : lineUp.artistName}
                      </span>
                      <span className="lineup-time">
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
                {t("price", "Price")}:{" "}
                {currentEventPrice !== null
                  ? new Intl.NumberFormat(
                      currentLang === "ka" ? "ka-GE" : "en-US",
                      { style: "currency", currency: "USD" } // Assuming USD, or make currency dynamic from basket
                    ).format(currentEventPrice)
                  : t("price_unavailable_display", "Price not available")}
              </div>
              <div className="ticket-quantity">
                <label htmlFor="ticketQuantity">{t("buy_tickets_label", "Buy Tickets")}:</label>
                <div
                  className={`quantity-control quantity-minus ${ticketQuantity === 1 ? "disabled" : ""}`}
                  onClick={() => { if (ticketQuantity > 1) setTicketQuantity((q) => q - 1); }}
                  role="button" tabIndex={0} onKeyPress={(e) => e.key === 'Enter' && ticketQuantity > 1 && setTicketQuantity(q => q - 1)} // Accessibility
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <g fill="none" fillRule="evenodd"><path fill="none" d="M0 0H24V24H0z"></path><path fill="currentColor" d="M18 11c.552 0 1 .448 1 1s-.448 1-1 1H6c-.552 0-1-.448-1-1s.448-1 1-1h12z"></path></g>
                  </svg>
                </div>
                <input
                  id="ticketQuantity"
                  type="number"
                  readOnly // Keep readOnly if +/- buttons are the only way to change
                  className="ticket-quantity-input"
                  value={ticketQuantity}
                  aria-label={t("ticket_quantity_aria_label", "Ticket Quantity")}
                  // onChange is not strictly needed if readOnly and using buttons, but good for completeness if it were editable
                  // onChange={(e) => setTicketQuantity(Math.max(1, parseInt(e.target.value, 10) || 1))}
                />
                <div
                  className="quantity-control quantity-plus"
                  onClick={() => setTicketQuantity((q) => q + 1)}
                  role="button" tabIndex={0} onKeyPress={(e) => e.key === 'Enter' && setTicketQuantity(q => q + 1)} // Accessibility
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <g fill="none" fillRule="evenodd"><path fill="none" d="M0 0H24V24H0z"></path><path fill="currentColor" d="M12 5c.552 0 1 .448 1 1v5h5c.552 0 1 .448 1 1s-.448 1-1 1h-5v5c0 .552-.448 1-1 1s-1-.448-1-1v-5H6c-.552 0-1-.448-1-1s.448-1 1-1h5V6c0-.552.448-1 1-1z"></path></g>
                  </svg>
                </div>
                <button className="buy-ticket-button" onClick={handleBuyTicket}>
                  {t("add_to_cart_button", "Add to Cart")}
                </button>
              </div>
            </section>
          )}
        </section>
        <section className="event-description">
          <p className="description-text">
            <Linkify
              componentDecorator={(decoratedHref, decoratedText, key) => (
                <a target="_blank" rel="noopener noreferrer" href={decoratedHref} key={key} className="description-link">
                  {decoratedText}
                </a>
              )}
            >
              {eventDescriptionDisplay || t("no_description_available", "No description available.")}
            </Linkify>
          </p>
        </section>
      </section>
    </div>
  );
}