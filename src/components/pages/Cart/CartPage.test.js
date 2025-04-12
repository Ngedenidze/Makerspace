import { render, screen } from "@testing-library/react";
import CartPage from "./CartPage";
import { CartProvider } from "./CartContext";

test("renders CartPage with empty cart message", () => {
  render(
    <CartProvider>
      <CartPage />
    </CartProvider>
  );

  expect(screen.getByText(/Your cart is empty/i)).toBeInTheDocument();
});