import React, { createContext, useReducer, useEffect } from "react";

const CartContext = createContext();

const initialState = {
  items: [] // items will be added as ticket objects { eventId, ticketId, eventName, price, ... }
};

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM":
      return { ...state, items: [...state.items, action.payload] };
    case "REMOVE_ITEM":
      return { ...state, items: state.items.filter(item => item.ticketId !== action.payload.ticketId) };
    case "CLEAR_CART":
      return { ...state, items: [] };
    default:
      return state;
  }
}

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addItem = (item) => {
    dispatch({ type: "ADD_ITEM", payload: item });
    console.log("Item added to cart:", item);
    // The following line logs the state before the update takes effect.
    console.log("Cart state (immediately after dispatch):", state);
  };

  const removeItem = (item) => {
    dispatch({ type: "REMOVE_ITEM", payload: item });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  // Log updated cart state whenever it changes.
  useEffect(() => {
    console.log("Cart state updated:", state);
  }, [state]);

  return (
    <CartContext.Provider value={{ cart: state, addItem, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
