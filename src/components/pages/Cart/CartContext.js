import React, { createContext, useReducer, useEffect } from "react";

const CartContext = createContext();

const initialState = {
  items: [],
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

    case "UPDATE_QUANTITY":
      return {
        ...state,
        items: state.items.map((item) =>
          item.ticketId === action.payload.ticketId
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };

    case "CLEAR_CART":
      return { ...state, items: [] };

case "FETCH_CART_SUCCESS":
  return { ...state, items: action.payload };

    default:
      return state;
  }
}

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addItem = (newItem) => {
    // Check if the item already exists in the cart by its ticketId.
    if (newItem.itemType === 'ticket') {
      // Ensure quantity is 1 if it's a ticket being added for the first time for that event
      dispatch({ type: "ADD_ITEM", payload: { ...newItem, quantity: 1 } });
    } else {
      // For other products, use existing logic to find and update quantity or add.
      // This assumes non-ticket items have a different way to check for existence,
      // e.g., using newItem.productId instead of newItem.ticketId.
      const existingItem = state.items.find(
        (item) => item.id === newItem.id && item.itemType !== 'ticket' // Example: check by a generic 'id' for products
      );
      if (existingItem) {
        dispatch({
          type: "UPDATE_QUANTITY",
          payload: {
            ticketId: existingItem.ticketId, // Or use the correct identifier for products
            quantity: existingItem.quantity + newItem.quantity,
          },
        });
      } else {
        dispatch({ type: "ADD_ITEM", payload: newItem });
      }
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
