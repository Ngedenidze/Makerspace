import React, { createContext, useReducer, useEffect } from "react";

const CartContext = createContext();

const initialState = {
  items: JSON.parse(localStorage.getItem("cartItems")) || [],
};

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM":
      const updatedItems = [...state.items, action.payload];
      localStorage.setItem("cartItems", JSON.stringify(updatedItems));
      return { ...state, items: updatedItems };
    case "REMOVE_ITEM":
      const filteredItems = state.items.filter(
        (item) => item.ticketId !== action.payload.ticketId
      );
      localStorage.setItem("cartItems", JSON.stringify(filteredItems));
      return { ...state, items: filteredItems };
    case "UPDATE_QUANTITY":
      const modifiedItems = state.items.map((item) =>
        item.ticketId === action.payload.ticketId
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
      localStorage.setItem("cartItems", JSON.stringify(modifiedItems));
      return { ...state, items: modifiedItems };
    case "CLEAR_CART":
      localStorage.removeItem("cartItems");
      return { ...state, items: [] };
    // Add SET_CART if you're rehydrating the cart from the backend:
    case "SET_CART":
      localStorage.setItem("cartItems", JSON.stringify(action.payload));
      return { ...state, items: action.payload };
    default:
      return state;
  }
}

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addItem = (newItem) => {
    // Check if the item already exists in the cart by its ticketId.
    const existingItem = state.items.find(
      (item) => item.ticketId === newItem.ticketId
    );
    if (existingItem) {
      // Merge the new item with the existing one by updating the quantity.
      dispatch({
        type: "UPDATE_QUANTITY",
        payload: {
          ticketId: newItem.ticketId,
          quantity: existingItem.quantity + newItem.quantity,
        },
      });
    } else {
      dispatch({ type: "ADD_ITEM", payload: newItem });
    }
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
    // console.log("Cart state updated:", state);
  }, [state]);

  return (
    <CartContext.Provider
      value={{
        cart: state,
        dispatch, // Exposing dispatch so you can call actions directly (e.g., SET_CART)
        addItem,
        removeItem,
        clearCart,
        updateQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
