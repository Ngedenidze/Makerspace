import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import EventPage from "./EventPage";

test("renders EventPage with event details", async () => {
  const mockEvent = {
    id: 1,
    name: "Test Event",
    description: "This is a test event.",
    eventPhotoUrl: "https://example.com/test.jpg",
    startDate: "2024-12-20T18:00:00",
    endDate: "2024-12-21T23:59:59",
    lineUps: [
      { id: 1, artistName: "DJ Test", startTime: "2024-12-20T19:00:00" },
    ],
  };

  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve(mockEvent),
    })
  );

  render(
    <MemoryRouter initialEntries={["/Events/1"]}>
      <Routes>
        <Route path="/Events/:id" element={<EventPage />} />
      </Routes>
    </MemoryRouter>
  );

  expect(await screen.findByText(/Test Event/i)).toBeInTheDocument();
  expect(await screen.findByText(/DJ Test/i)).toBeInTheDocument();
});