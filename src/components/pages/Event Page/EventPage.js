import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import localImg from "../../../assets/cover-art-4.jpg";
import { useTranslation } from "react-i18next";
import CartContext from "../Cart/CartContext";
import api from "../authPage/utils/AxiosInstance";
import Linkify from "react-linkify";
import "./EventPage.css";

// Define a constant for GEL to USD conversion rate
 // Example rate, replace with the actual rate if needed
import i18n from "i18next"; // You can often get i18n instance from useTranslation too
import Loader from "../../reusable/Loader/Loader";
import { toast } from "react-toastify"; // Make sure react-toastify is set up

export default function EventPage() {
  const GEL_TO_USD_RATE = 0.31;
  const { id } = useParams();
  const { cart, addItem } = useContext(CartContext);
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

  const handleBuyTicket = async () => {
    const eventIdToAdd = String(event.id); // Ensure it's a string for comparison if item.eventId is stored as string

    // Check if a ticket for this event (itemType: 'ticket') already exists in the cart
    const existingTicketForEvent = cart.items.find(
      item => String(item.eventId) === eventIdToAdd && item.itemType === 'ticket'
    );

    if (existingTicketForEvent) {
      toast.warn(t("event_page.ticket_already_in_cart", "You already have a ticket for this event in your cart."));
      return;
    }

    if (currentEventPrice === null || currentEventPrice === undefined) {
      toast.error(t("error.price_not_available_cart", "Ticket price is currently not available. Cannot add to cart."));
      return;
    }
    
    const quantityToAdd = 1; // For tickets, quantity is always 1

    const eventNameForCart = currentLang === "ka" ? event.name : event.nameLat;
    const eventDescriptionForCart = currentLang === "ka" ? event.description : event.descriptionLat; // Ensure these fields exist on `event`
    const eventImageForCart = event.eventPhotoUrl || localImg;
    
    let basketIdForTicket = null;
    if (event.baskets && event.baskets.length > 0) {
        basketIdForTicket = event.baskets[0].id;
    }

    // Consider a loading state for the button itself
    // e.g. const [isAdding, setIsAdding] = useState(false); setIsAdding(true);
    
    try {
      // This API call might be for session validation or cart pre-check.
      // If not strictly necessary for adding an item, consider removing.
      await api.get("/Cart/my-cart"); 
      
      let addTicketUrl = `/Cart/add-ticket?eventId=${Number(event.id)}&quantity=${quantityToAdd}`;
      // If your backend needs basketId to correctly associate the price/ticket type:
      // if (basketIdForTicket) {
      //   addTicketUrl += `&basketId=${basketIdForTicket}`;
      // }
     
      const addTicketRes = await api.post(addTicketUrl);

      // Use price from backend response if available (e.g., if backend confirms price based on basketId),
      // otherwise use currentEventPrice determined from the event's first basket.
      const confirmedPrice = addTicketRes.data.price !== undefined ? addTicketRes.data.price : currentEventPrice;

      addItem({
        eventId: eventIdToAdd,
        ticketId: addTicketRes.data.ticketId, // Unique ID for this specific ticket instance
        eventName: eventNameForCart,
        price: confirmedPrice,
        image: eventImageForCart,
        description: eventDescriptionForCart,
        quantity: quantityToAdd, // Always 1
        date: formattedDate, // Event start date for display in cart
        itemType: 'ticket', // Crucial for distinguishing from other products
        // basketId: basketIdForTicket, // Optionally store which basket was used
      });
      toast.success(t("ticket_added_to_cart_single", "{{eventName}} ticket added to your cart!", { eventName: eventNameForCart }));
    } catch (error) {
      console.error("Ticket reservation error:", error);
      const errorMessage = error.response?.data?.message || t("error.add_to_cart_failed", "Failed to add ticket to cart.");
      toast.error(errorMessage);
    } finally {
      // e.g. setIsAdding(false);
    }
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
           <div className="ticket-price-display">
      
    </div>
        </section>
        <header className="event-header">
          <h1 className="event-title">{eventNameDisplay}</h1>
                 <span className="price-label">{t("price", "Price")}: {" "}
        {currentEventPrice !== null
          ? new Intl.NumberFormat(
              currentLang === "ka" ? "ka-GE" : (i18n.language || "en-US"),
              { 
                style: "currency", 
                currency: currentLang === 'en' ? 'USD' : 'GEL' // Dynamic currency based on lang
              }
            ).format(currentLang === 'en' ? (currentEventPrice * GEL_TO_USD_RATE) : currentEventPrice) // GEL_TO_USD_RATE needs to be defined
          : t("price_unavailable_display", "Price not available")}
      </span>
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
        {showBuySection && (
  <section className="buy-ticket-panel">
   
   
    {/* <div className="ticket-quantity-selector">
      <div className="quantity-controls">
        <button
          type="button"
          className={`quantity-button minus ${ticketQuantity <= 1 ? "disabled" : ""}`}
          onClick={() => { if (ticketQuantity > 1) setTicketQuantity((q) => q - 1); }}
          disabled={ticketQuantity <= 1}
          aria-label={t('decrease_quantity', 'Decrease quantity')}
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M19 13H5v-2h14v2Z"/></svg>
        </button>
        <input
          id="ticketQuantity"
          type="number"
          className="ticket-quantity-input"
          value={ticketQuantity}
          onChange={(e) => {
            const val = parseInt(e.target.value, 10);
            if (val >= 1) {
              setTicketQuantity(val);
            } else if (e.target.value === "") {
              setTicketQuantity(1); // Or handle empty differently if needed
            }
          }}
          min="1"
          aria-label={t("ticket_quantity_aria_label", "Ticket Quantity")}
        />
        <button
          type="button"
          className="quantity-button plus"
          onClick={() => setTicketQuantity((q) => q + 1)}
          aria-label={t('increase_quantity', 'Increase quantity')}
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2Z"/></svg>
        </button>
      </div>
    </div> */}

    <button 
      className="add-to-cart-button" 
      onClick={handleBuyTicket}
      // disabled={isLoadingAddToCart} // If you add a loading state for this action
    >
      {/* {isLoadingAddToCart ? <Loader size="inline" /> : t("add_to_cart_button", "Add to Cart")} */}
      {t("add_to_cart_button", "Add to Cart")}
    </button>
  </section>
)}
      </section>
    </div>
  );
}