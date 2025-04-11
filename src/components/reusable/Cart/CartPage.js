// CartPage.js
import React, { useContext, useEffect, useState } from "react";
import CartContext from "./CartContext";
import "./CartPage.css";

export default function CartPage() {
  const { cart, removeItem, updateQuantity } = useContext(CartContext);

  // We'll calculate subtotal, shipping, and total for demonstration
  const [subTotal, setSubTotal] = useState(0);
  const [shippingCost, setShippingCost] = useState(0);
  const [estimatedTotal, setEstimatedTotal] = useState(0);
  const FREE_SHIPPING_THRESHOLD = 100; // Example threshold

  // Recalculate costs whenever cart.items changes
  useEffect(() => {
    let newSubTotal = 0;
    cart.items.forEach((item) => {
      const itemPrice = parseFloat(item.price) || 0;
      newSubTotal += itemPrice * (item.quantity || 1);
    });
    setSubTotal(newSubTotal);

    const newShippingCost = newSubTotal >= FREE_SHIPPING_THRESHOLD ? 0 : 10;
    setShippingCost(newShippingCost);

    setEstimatedTotal(newSubTotal + newShippingCost);
  }, [cart.items]);

  const handleIncrease = (item) => {
    if (item.quantity < 2) {
      updateQuantity(item.ticketId, item.quantity + 1);
    }
  };

  const handleDecrease = (item) => {
    if (item.quantity > 1) {
      updateQuantity(item.ticketId, item.quantity - 1);
    }
  };

  // Example message for free shipping
  const freeShippingMessage =
    subTotal >= FREE_SHIPPING_THRESHOLD
      ? "You qualify for free shipping!"
      : `You're $${(FREE_SHIPPING_THRESHOLD - subTotal).toFixed(
          2
        )} away from free shipping!`;

  return (
    <div className="cart-container">
      <div className="cart-items">
        <h1 className="cart-title">Shopping Cart</h1>
        {cart.items.length === 0 ? (
          <p className="empty-cart">Your cart is empty.</p>
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
                  <p className="cart-item-stock">Ticket ID: {item.ticketId}</p>
                </div>
              </div>
              <div className="cart-item-right">
                <div className="cart-price">
                  <span>Each:</span> ${parseFloat(item.price) || 0}
                </div>
                <div className="cart-quantity">
                  <button
                    className="quantity-btn"
                    onClick={() => handleDecrease(item)}
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span className="quantity-value">{item.quantity}</span>
                  <button
                    className="quantity-btn"
                    onClick={() => handleIncrease(item)}
                    disabled={item.quantity >= 2}
                  >
                    +
                  </button>
                </div>
                <button className="remove-btn" onClick={() => removeItem(item)}>
                  Remove
                </button>
              </div>
            </div>
          ))
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
          <span>Shipping Cost:</span>
          <span>${shippingCost.toFixed(2)}</span>
        </div>
        {/* You can skip Discount entirely or show it as $0 */}
        <div className="summary-row">
          <span>Discount:</span>
          <span>$0.00</span>
        </div>
        <hr />
        <div className="summary-row total-row">
          <span>Estimated Total:</span>
          <span>${estimatedTotal.toFixed(2)}</span>
        </div>
        <p className="free-shipping-msg">{freeShippingMessage}</p>
        <button
          className="checkout-btn"
          onClick={() => alert("Proceeding to checkout page...")}
        >
          Checkout
        </button>
      </div>
    </div>
  );
}
