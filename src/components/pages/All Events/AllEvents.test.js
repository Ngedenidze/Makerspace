import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Events from "./AllEvents";

test("renders AllEvents page with tabs", () => {
  render(
    <MemoryRouter>
      <Events />
    </MemoryRouter>
  );

  expect(screen.getByText(/Upcoming Events/i)).toBeInTheDocument();
  expect(screen.getByText(/Past Events/i)).toBeInTheDocument();
});