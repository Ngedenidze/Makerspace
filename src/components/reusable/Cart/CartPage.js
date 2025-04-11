import React, { useContext, useEffect } from "react";
import CartContext from "./CartContext";
import "./CartPage.css";

export default function CartPage() {
  const { cart, removeItem } = useContext(CartContext);

  useEffect(() => {
    console.log("CartPage: Cart items updated", cart.items);
  }, [cart.items]);

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>
      {cart.items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cart.items.map((item) => (
            <li key={item.ticketId} className="cart-item">
              <div>
                <strong>{item.eventName}</strong> <br />
                Ticket ID: {item.ticketId} <br />
                Price: {item.price}
              </div>
              <button onClick={() => removeItem(item)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
      <div className="cart-summary">
        <button onClick={() => alert("Proceeding to checkout page...")}>
          Checkout
        </button>
      </div>
    </div>
  );
}
