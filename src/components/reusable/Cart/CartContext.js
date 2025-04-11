import React, { createContext, useReducer, useEffect } from "react";

const CartContext = createContext();

const initialState = {
  items: [] // Each item: { eventId, ticketId, eventName, price, image, description, quantity, ... }
};

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM":
      return { ...state, items: [...state.items, action.payload] };
    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter(
          (item) => item.ticketId !== action.payload.ticketId
        ),
      };
    case "CLEAR_CART":
      return { ...state, items: [] };
    case "UPDATE_QUANTITY":
      return {
        ...state,
        items: state.items.map((item) => {
          if (item.ticketId === action.payload.ticketId) {
            return { ...item, quantity: action.payload.quantity };
          }
          return item;
        }),
      };
    default:
      return state;
  }
}

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addItem = (item) => {
    dispatch({ type: "ADD_ITEM", payload: item });
    console.log("Item added to cart:", item);
    // Note: state update is asynchronous; the immediate log below may still show the previous state.
    console.log("Cart state (immediately after dispatch):", state);
  };

  const removeItem = (item) => {
    dispatch({ type: "REMOVE_ITEM", payload: item });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  const updateQuantity = (ticketId, quantity) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { ticketId, quantity } });
  };

  useEffect(() => {
    console.log("Cart state updated:", state);
  }, [state]);

  return (
    <CartContext.Provider
      value={{ cart: state, addItem, removeItem, clearCart, updateQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
