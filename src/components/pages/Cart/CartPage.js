import React, { useContext, useEffect, useState, useCallback } from "react";
import CartContext from "./CartContext";
import "./CartPage.css";
import { Link } from "react-router-dom";
import api from "../authPage/utils/AxiosInstance";
import debounce from "lodash.debounce";

export default function CartPage() {
  const { cart, dispatch, removeItem } = useContext(CartContext);
  const [subTotal, setSubTotal] = useState(0);
  const [estimatedTotal, setEstimatedTotal] = useState(0);

  // On mount: fetch the cart data from the backend and set it.
  useEffect(() => {
    api.get("/Cart/my-cart")
      .then((res) => {
        // Assume res.data.ticketItems is an array from the backend.
        const ticketItems = res.data.ticketItems;
        // Map backend structure to the expected local shape.
        const transformedItems = ticketItems.map((ticket) => ({
          ticketId: ticket.id,
          eventId: ticket.eventId,
          eventName: ticket.event.name,
          description: ticket.event.description,
          image: ticket.event.eventPhotoUrl,
          quantity: ticket.quantity,
          date: new Date(ticket.event.startDate).toLocaleString(),
          // Optionally: price: ticket.event.price
        }));

        // Dispatch SET_CART if you have it or use your own custom update method.
        dispatch({ type: "SET_CART", payload: transformedItems });
      })
      .catch((err) => {
        console.error("Error fetching cart:", err);
      });
  }, [dispatch]);

  // Recalculate totals whenever the cart changes.
  useEffect(() => {
    let newSubTotal = 0;
    cart.items.forEach((item) => {
      const itemPrice = parseFloat(item.price) || 0;
      newSubTotal += itemPrice * (item.quantity || 1);
    });
    setSubTotal(newSubTotal);
    setEstimatedTotal(newSubTotal);
  }, [cart.items]);

  // Create a debounced function to update the backend.
  // Using useCallback to ensure that the debounced function is not recreated on every render.
  const updateQuantityBackend = useCallback(
    debounce((item, newQuantity) => {
      api.post(`/Cart/update-ticket?eventId=${item.eventId}&quantity=${newQuantity}`)
        .then((res) => {
          console.log(`Backend updated: ticketId ${item.ticketId} now has quantity ${newQuantity}`);
        })
        .catch((error) => {
          console.error("Error updating quantity on backend:", error);
        });
    }, 500), // 500ms debounce delay; adjust as needed.
    []
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
        console.error("Ticket removal error:", error);
        alert("Error removing ticket from cart.");
      });
  };

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h1 className="cart-title">
          {cart.items.length === 0 ? "Cart is Empty" : "Cart"}
        </h1>
      </div>
      <div className="cart-main-body">
        <div className="cart-items">
          {cart.items.length === 0 ? (
            <Link to="/AllEvents" className="empty-cart">
              Go back to events
            </Link>
          ) : (
            cart.items.map((item) => (
              <div className="cart-row" key={item.ticketId}>
                <div className="cart-item-left">
                  <img
                    src={item.image}
                    alt={item.eventName}
                    className="cart-item-image"
                  />
                  <div className="cart-item-info">
                    <h2 className="cart-item-name">{item.eventName}</h2>
                    <p className="cart-item-desc">{item.description}</p>
                    <p className="cart-item-stock">{item.date}</p>
                  </div>
                </div>
                <div className="cart-item-right">
                  <div className="cart-price">
                    <span>Price:</span> ${parseFloat(item.price) || 0}
                  </div>
                  <div className="cart-quantity">
                    <button
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
                    </button>
                  </div>
                  <button className="remove-btn" onClick={() => handleRemove(item)}>
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
          {cart.items.length === 0 ? (
            ""
          ) : (
            <>
              <div className="discount-row">
                <input
                  type="text"
                  placeholder="Enter discount code"
                  className="discount-input"
                />
                <button className="apply-discount-btn">Update Cart</button>
              </div>
              <div className="terms-and-conditions">
                <label htmlFor="termsCheckbox" className="terms-label">
                  <input type="checkbox" required id="termsCheckbox" />
                  <span className="terms-checkbox"></span>
                  <span className="terms-text">
                    <span
                      className="required-asterisk"
                      style={{ color: "red", marginRight: "4px" }}
                    >
                      *
                    </span>
                    By proceeding to checkout, you agree to our{" "}
                    <Link className="terms-link" to="/terms">
                      Terms and Conditions
                    </Link>
                    . By placing an order for digital products, I explicitly agree
                    that the contract will be fulfilled before the withdrawal period
                    ends, and I understand that I cannot cancel or withdraw my purchase.
                  </span>
                </label>
              </div>
            </>
          )}
        </div>
        {/* Summary Column */}
        <div className="cart-summary">
          <h2>Order Summary</h2>
          <div className="summary-row">
            <span>Subtotal:</span>
            <span>${subTotal.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Discount:</span>
            <span>$0.00</span>
          </div>
          <hr />
          <div className="summary-row total-row">
            <span>Estimated Total:</span>
            <span>${estimatedTotal.toFixed(2)}</span>
          </div>
          <button
            className="checkout-btn"
            onClick={() => alert("Proceeding to checkout page...")}
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
