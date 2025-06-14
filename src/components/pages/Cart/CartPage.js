import React, { useContext, useEffect, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import CartContext from "./CartContext";
import "./CartPage.css";
import { Link } from "react-router-dom";
import api from "../authPage/utils/AxiosInstance";
import debounce from "lodash.debounce";
import defaultImage from "./../../../assets/default_cover.webp"; // Default image path
import { toast } from "react-toastify";
import Loader from "../../reusable/Loader/Loader";

export default function CartPage() {
  const { cart, dispatch, removeItem } = useContext(CartContext);
  const [subTotal, setSubTotal] = useState(0);
  const [estimatedTotal, setEstimatedTotal] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageSrc, setModalImageSrc] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCartLoading, setIsCartLoading] = useState(false);
  const [cartFetchError, setCartFetchError] = useState(null);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const { t, i18n } = useTranslation();
  const currentLang = i18n.language.split("-")[0];
    const [summaryLocale, setSummaryLocale] = useState({
  locale: i18n.language || 'ka-GE',
  currency: currentLang === 'en' ? 'USD' : 'GEL',
});
  useEffect(() => {
    setIsCartLoading(true); // Start loading
    setCartFetchError(null); // Reset error
    api
      .get("/Cart/my-cart")
      .then((res) => {
        if (res.data && Array.isArray(res.data.ticketItems)) {
          const ticketItems = res.data.ticketItems;


          const transformedItems = ticketItems.map((ticket) => {
            let itemPrice = 0; // Default price if not found or invalid
            let chosenBasketId = null; // To store which basket's price is used

            // --- Price Logic ---
            if (
              ticket.event &&
              Array.isArray(ticket.event.baskets) &&
              ticket.event.baskets.length > 0
            ) {
              // For now, as per your requirement, use the price from the first basket.
              const firstBasket = ticket.event.baskets[0];
              itemPrice = firstBasket.price;
              chosenBasketId = firstBasket.id; // Store the ID of the basket used
             
              // TODO: Logic for handling multiple baskets (when you have 3 baskets or more)
              // This is where you would implement selection logic if needed.
              // For example, if the cart item itself stored which basketId it belongs to:
              /*
        if (ticket.userSelectedBasketId && ticket.event.baskets.length > 1) {
          const selectedBasket = ticket.event.baskets.find(b => b.id === ticket.userSelectedBasketId);
          if (selectedBasket) {
            itemPrice = selectedBasket.price;
            chosenBasketId = selectedBasket.id;
          } else {
            console.warn(`Cart item ticketId: ${ticket.id} had a selectedBasketId ${ticket.userSelectedBasketId} not found in event's baskets. Defaulting to first basket or 0.`);
            // Fallback to first basket's price if selected is not found, or keep default 0
            itemPrice = firstBasket.price; 
            chosenBasketId = firstBasket.id;
          }
        } else {
          // If only one basket, or no specific selection, use the first one (current logic)
          itemPrice = firstBasket.price;
          chosenBasketId = firstBasket.id;
        }
        */
              // For 3 baskets, you might have different tiers (e.g., 'standard', 'vip', 'early_bird')
              // and the cart item would need to store which tier/basket it corresponds to.
              // The logic would then find the correct basket by its type or ID.
            } else {
              console.warn(
                `Price information (baskets array) is missing or empty for eventId: ${ticket.eventId} in cart item (ticketId: ${ticket.id}). Defaulting price to 0.`
              );
            }
            // --- End Price Logic ---

            // Ensure price is a valid number
            const numericPrice = Number(itemPrice);
            if (isNaN(numericPrice)) {
              console.warn(
                `Invalid price value ('${itemPrice}') found for ticketId: ${ticket.id} (Event: ${ticket.event?.nameLat}). Defaulting to 0.`
              );
              itemPrice = 0;
            } else {
              itemPrice = numericPrice;
            }

            return {
              ticketId: ticket.id, // This is the cart item's unique ID
              eventId: ticket.eventId,
              eventName: ticket.event?.nameLat || "Event Name N/A", // Use optional chaining and provide fallback
              description: ticket.event?.descriptionLat || "", // Assuming descriptionLat for consistency
              image: ticket.event?.eventPhotoUrl, // Default image rendering is handled in CartPage
              quantity: ticket.quantity,
              date: ticket.event?.startDate
                ? new Date(ticket.event.startDate).toLocaleString()
                : "Date N/A",
              price: itemPrice, // Use the correctly extracted and validated price
              // Optionally store which basket was used, if relevant for other operations
              // basketId: chosenBasketId,
            };
          });

          dispatch({ type: "FETCH_CART_SUCCESS", payload: transformedItems });
        } else {

          dispatch({
            type: "FETCH_CART_ERROR",
            payload: "Invalid cart data received.",
          });
        }
      })
      .catch((err) => {

        setCartFetchError(
          err.message || "Failed to fetch cart items. Please try again."
        );
        // Optionally dispatch an action to clear the cart or handle the error in context
        dispatch({ type: "SET_CART_ERROR" }); // Example
      })
      .finally(() => {
        setIsCartLoading(false); // Stop loading
      });
  }, [dispatch]);
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsModalOpen(false);
      }
    };
    if (isModalOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isModalOpen]);
  // Recalculate totals whenever the cart changes.
useEffect(() => {
  // 1) Sum up the raw GEL total
  const rawGELTotal = cart.items.reduce((sum, item) => {
    const price = parseFloat(item.price) || 0;
    return sum + price * (item.quantity || 1);
  }, 0);

  // 2) Choose conversion & locale based on language
  let converted = rawGELTotal;
  let currency = 'GEL';
  let locale   = 'ka-GE';


  // 3) Store both the numeric total and the formatter info
  setSubTotal(rawGELTotal);
  setEstimatedTotal(rawGELTotal);
  setSummaryLocale({ locale, currency });
}, [cart.items, currentLang]);

  const updateQuantityBackend = useCallback(
    debounce(async (item, newQuantity) => {
      // Make it async
      try {
        await api.post(`/Cart/update-ticket?eventId=${item.eventId}&quantity=${newQuantity}`); // Or use item.ticketId if that's the correct identifier for backend

      } catch (error) {

        toast.error(
          `Failed to update quantity for ${item.eventName}. Please try again.`
        );
        // Potentially revert local state change here if it was optimistic
        // Or dispatch an action to refetch the cart to ensure consistency
        dispatch({
          type: "UPDATE_QUANTITY",
          payload: { ticketId: item.ticketId, quantity: item.quantity }, // Revert to original quantity
        });
      }
    }, 500), // Increased debounce slightly
    [dispatch] // Add dispatch if used for reverting
  );

  // Increase item quantity and schedule backend update.
  const handleIncrease = (item) => {
    const newQuantity = item.quantity + 1;
    dispatch({
      type: "UPDATE_QUANTITY",
      payload: { ticketId: item.ticketId, quantity: newQuantity },
    });
    updateQuantityBackend(item, newQuantity);
  };

  const handleCheckout = async () => {
    if (isLoading) return;
    if (!termsAccepted) {
      toast.warn("Please accept the terms and conditions to proceed.");
      setIsLoading(false); // Stop loading if terms are not accepted
      return;
    }
    if (cart.items.length === 0) {
      toast.warn(
        "Your cart is empty. Please add items to your cart before checking out."
      );
      return;
    }

    setIsLoading(true);

    try {
      const response = await api.post("/Cart/checkout");

      if (
        response.status >= 200 &&
        response.status < 300 &&
        response.data &&
        response.data.redirect
      ) {
        
        const redirectUrl = response.data.redirect; // Corrected from response.data.redirect based on your description
        toast.info("Redirecting to complete your checkout...");
        window.location.href = redirectUrl;
      } else {

        toast.error(
          "Checkout initiation failed. Please try again or contact support."
        );
        setIsLoading(false); // Stop loading in case of failure
      }
    } catch (error) {

      let errorMessage = "Error during checkout. Please try again.";
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        // Fallback to generic error message if no specific backend message
        errorMessage = error.message;
      }
      toast.error(errorMessage);
      setIsLoading(false); // Stop loading in case of failure
    } finally {
      setIsLoading(false);
    }
  };
  // Decrease item quantity and schedule backend update.
  const handleDecrease = (item) => {
    if (item.quantity > 1) {
      const newQuantity = item.quantity - 1;
      dispatch({
        type: "UPDATE_QUANTITY",
        payload: { ticketId: item.ticketId, quantity: newQuantity },
      });
      updateQuantityBackend(item, newQuantity);
    }
  };

  // Remove item from cart, calling the backend then updating context.
  const handleRemove = (item) => {
    api
      .post(`/Cart/remove-ticket?eventId=${item.eventId}`)
      .then((res) => {
        dispatch({ type: "REMOVE_ITEM", payload: item });
      })
      .catch((error) => {

        toast.error("Error removing ticket from cart.");
      });
  };
  if (isCartLoading) return <Loader />;
  if (cartFetchError) return <p>Error: {cartFetchError}</p>;
  return (
    <>
      <div className="cart-container">
        <div className="cart-header">
          <h1 className="cart-title">
            {cart.items.length === 0 ? t('cart.cart_empty') : t('cart.cart')}
          </h1>
        </div>
        <div className="cart-main-body">
          <div className="cart-items">
            {cart.items.length === 0 ? (
              <Link to="/AllEvents" className="empty-cart">
                Go back to events
              </Link>
            ) : (
              cart.items.map((item) => {
                // --- START: Price Calculation and Formatting Logic for each item ---
                const GEL_TO_USD_RATE = 0.37; // IMPORTANT: Manage this rate externally (config/API)
                 let priceForFormatting = item.price; // Assumed to be in GEL from context
                let displayCurrencyCode = 'GEL';
                let displayLocale = i18n.language || 'ka-GE'; // Default to Georgian locale
 if (typeof item.price !== 'number' || isNaN(item.price)) {
                  console.warn(`CartPage: Invalid price for item ${item.ticketId}: ${item.price}. Using 0.`);
                  priceForFormatting = 0; 
                } if (currentLang === 'en') {
                  priceForFormatting = item.price; // Convert GEL to USD
                
                }
                // For 'ka' (or other languages not 'en'), it defaults to GEL as set above

                let formattedPriceDisplay;
                try {
                  formattedPriceDisplay = new Intl.NumberFormat(displayLocale, {
                    style: 'currency',
                    currency: displayCurrencyCode, // Dynamically 'GEL' or 'USD'
                  }).format(priceForFormatting);
                } catch (e) {

                  // Fallback display if Intl.NumberFormat fails (e.g., invalid locale/currency somehow)
                  formattedPriceDisplay = `${priceForFormatting.toFixed(2)} ${displayCurrencyCode}`;
                }
                return (
                <div className="cart-row" key={item.ticketId}>
                  <div className="cart-item-left">
                    <div className="cart-image-container">
                    <img
                      src={item.image || defaultImage} // Provide defaultImage as initial src too if item.image can be falsy
                      alt={item.eventName}
                      className="cart-item-image"
                      onClick={() => {
                        setModalImageSrc(item.image || defaultImage);
                        setIsModalOpen(true);
                      }}
                      onError={(e) => {
                        // If the primary image fails to load, set it to the default image
                        if (e.target.src !== defaultImage) {
                          // Prevent infinite loop if defaultImage also fails
                          e.target.onerror = null; // Prevent future error triggers on this element
                          e.target.src = defaultImage;
                        }
                      }}
                    />
                    </div>
                    <div className="cart-item-info">
                      <h2 className="cart-item-name">{item.eventName}</h2>
                       <div className="cart-price">
                        <span>{t("cart.item_price_label", "Price:")}</span>{" "}
                        {formattedPriceDisplay} {/* Use the fully formatted string */}
                      </div>
                      <p className="cart-item-desc">{item.description}</p>
                      <p className="cart-item-stock">{item.date}</p>
                    </div>
                  </div>
                  <div className="cart-item-right">
                    
                      <div className="cart-quantity">
                      {/* <button
                        className="quantity-btn"
                        onClick={() => handleDecrease(item)}
                        disabled={item.quantity <= 1}
                      >
                        –
                      </button>
                      <span className="quantity-value">{item.quantity}</span>
                      <button
                        className="quantity-btn"
                        onClick={() => handleIncrease(item)}
                      >
                        +
                      </button> */}
                    </div>
                    <button
                      className="remove-btn"
                      onClick={() => handleRemove(item)}
                    >
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 30 30" fill="currentColor">
<path d="M 13 3 A 1.0001 1.0001 0 0 0 11.986328 4 L 6 4 A 1.0001 1.0001 0 1 0 6 6 L 24 6 A 1.0001 1.0001 0 1 0 24 4 L 18.013672 4 A 1.0001 1.0001 0 0 0 17 3 L 13 3 z M 6 8 L 6 24 C 6 25.105 6.895 26 8 26 L 22 26 C 23.105 26 24 25.105 24 24 L 24 8 L 6 8 z"></path>
</svg>
                    </button>
                  </div>
                </div>
              );
})
            )}
            {cart.items.length === 0 ? (
              ""
            ) : (
              <>
                <div className="discount-row">
                  <input
                    type="text"
                    placeholder={t("cart.enter_discount_code", "Enter discount code")}
                    className="discount-input"
                  />
                  <button className="apply-discount-btn">{t("cart.update_cart", "Update Cart")}</button>
                </div>
                <div className="terms-and-conditions">
                  <label htmlFor="termsCheckbox" className="terms-label">
                    <input
                      type="checkbox"
                      checked={termsAccepted}
                      onChange={(e) => setTermsAccepted(e.target.checked)}
                      id="termsCheckbox"
                    />
                    <span className="terms-checkbox"></span>
                    <span className="terms-text">
                      <span
                        className="required-asterisk"
                        style={{ color: "red", marginRight: "4px" }}
                      >
                        *
                      </span>
                      {/* By proceeding to checkout, you agree to our{" "}
                      <Link className="terms-link" to="/terms">
                        Terms and Conditions
                      </Link> */}
                      {t("cart.terms_and_conditions", "By proceeding to checkout, you agree to our")}{" "}
                      <Link className="terms-link" to="/terms">
                        {t("cart.terms_and_conditions_2", "Terms and Conditions")}
                      </Link>
                    </span>
                  </label>
                </div>
              </>
            )}
          </div>
          {/* Summary Column */}
          <div className="cart-summary">
            <h2>{t("cart.order_summary", "Order Summary")}</h2>
            <div className="summary-row">
              <span>{t("cart.subtotal", "Subtotal")}:</span>
  <span>
    {new Intl.NumberFormat(summaryLocale.locale, {
      style: 'currency',
      currency: summaryLocale.currency,
    }).format(subTotal)}
  </span>
</div>
            <div className="summary-row">
              <span>{t("cart.discount", "Discount")}:</span>
              <span>$0.00</span>
            </div>
            <hr />
          <div className="summary-row total-row">
  <span>{t("cart.estimated_total", "Total")}</span>
  <span>
    {new Intl.NumberFormat(summaryLocale.locale, {
      style: 'currency',
      currency: summaryLocale.currency,
    }).format(estimatedTotal)}
  </span>
</div>
            <button className="checkout-btn" onClick={() => handleCheckout()}>
              {t("cart.checkout", "Checkout")}
            </button>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div
          className="image-modal-overlay"
          onClick={() => setIsModalOpen(false)}
        >
          <img
            src={modalImageSrc}
            alt="Full size"
            className="image-modal-content"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className="image-modal-close"
            onClick={() => setIsModalOpen(false)}
          >
            &times;
          </button>
        </div>
      )}
    </>
  );
}
