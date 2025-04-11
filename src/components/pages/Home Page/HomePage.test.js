import { render, screen } from "@testing-library/react";
import Homepage from "./HomePage";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

test("renders Homepage with sections", () => {
  render(
    <QueryClientProvider client={queryClient}>
      <Homepage />
    </QueryClientProvider>
  );

  expect(screen.getByText(/Upcoming Events/i)).toBeInTheDocument();
  expect(screen.getByText(/Past Events/i)).toBeInTheDocument();
  expect(screen.getByText(/Commercial Renting/i)).toBeInTheDocument();
});