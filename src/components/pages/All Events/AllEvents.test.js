import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Events from "./AllEvents";
import {  QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();
test("renders AllEvents page with tabs", () => {
  render(
    <QueryClientProvider client={queryClient}>
    <MemoryRouter>
      <Events />
    </MemoryRouter>
    </QueryClientProvider>
  );

  expect(screen.getByText(/Upcoming Events/i)).toBeInTheDocument();
  expect(screen.getByText(/Past Events/i)).toBeInTheDocument();
});