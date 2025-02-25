import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/HomePage";
import About from "./pages/About";
import Reservation from "./pages/BookingPage";
import Order from "./pages/Order";
import Confirmation from "./pages/Confirmation";
import EventDetails from "./pages/Events";
import EventPage from "./sections/eventProfile/EventPage";
import Specials from "./sections/headingPages/Specials";

export default function Routing() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />

      <Route path="/about" element={<About />} />

      <Route path="/reservations" element={<Reservation />} />

      <Route path="/order" element={<Order />} />

      <Route path="/confirmation" element={<Confirmation />} />
{/* 
      <Route path="/Events/:id" element={<EventDetails />} /> */}
      <Route path="/Events" element={<Specials />} />
      <Route path="/Events/:id" element={<EventPage />} /> 
    </Routes>
  );
}
