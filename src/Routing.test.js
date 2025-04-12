import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Routing from "./Routing";
import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();
test("renders Homepage route", () => {
  render(
    <QueryClientProvider client={queryClient}>
    <MemoryRouter initialEntries={["/"]}>
      <Routing />
    </MemoryRouter>
    </QueryClientProvider>
  );

  expect(screen.getByText(/Upcoming Events/i)).toBeInTheDocument();
});

test("renders EventPage route", () => {
  render(
    <MemoryRouter initialEntries={["/Events/1"]}>
      <Routing />
    </MemoryRouter>
  );

  expect(screen.getByText(/Loading event/i)).toBeInTheDocument();
});