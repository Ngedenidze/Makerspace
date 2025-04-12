import React, { createContext, useReducer, useEffect } from "react";

const CartContext = createContext();

const initialState = {
  items: [] // Each item: { eventId, ticketId, eventName, price, image, description, quantity, ... }
};

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM":
      // Instead of blindly adding, this case is no longer needed
      // if duplicate handling is performed in addItem function.
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
      // Uncomment for debug logging:
      // console.log("Updated existing item quantity:", newItem.ticketId);
    } else {
      dispatch({ type: "ADD_ITEM", payload: newItem });
      // Uncomment for debug logging:
      // console.log("Item added to cart:", newItem);
    }
    // Uncomment for overall cart state logging:
    // console.log("Cart state after addItem:", state);
  };

  const removeItem = (item) => {
    dispatch({ type: "REMOVE_ITEM", payload: item });
    // console.log("Item removed from cart:", item);
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
    // console.log("Cart cleared");
  };

  const updateQuantity = (ticketId, quantity) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { ticketId, quantity } });
    // console.log("Quantity updated for ticket:", ticketId, "Quantity:", quantity);
  };

  useEffect(() => {
    // Uncomment this line if you need to observe cart state changes during development.
    // console.log("Cart state updated:", state);
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
