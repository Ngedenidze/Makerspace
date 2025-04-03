import { Routes, Route, HashRouter, Navigate } from "react-router-dom";
import Homepage from "./pages/HomePage";
import About from "./pages/About";
import Reservation from "./pages/BookingPage";
import Order from "./pages/Order";
import Confirmation from "./pages/Confirmation";
import EventDetails from "./pages/Events";
import EventPage from "./pages/EventPage";
import Rentals from "./pages/Rentals";
import Events from "./pages/Events";
import DJs from "./pages/DJs";
import AuthPage from "./sections/authPage/AuthPage";
import Profile from "./pages/user profile/Profile";
import Gallery from "./pages/Gallery/Gallery";
import QRScan from "./pages/Qr scan/QRScan";
import { useAuth } from "./sections/authPage/utils/AuthProvider";

function PrivateRoute({ children }) {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" />;
}
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
      <Route path="/Rentals" element = {<Rentals />} />
      <Route path="/AllEvents" element={<Events />} />
      <Route path="/AllEvents/:tab" element={<Events />} />
      <Route path="/Events/:id" element={<EventPage />} /> 
      <Route path="/DJs" element={<DJs />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/login" element={<AuthPage page="login" />} />
      <Route path="/register" element={<AuthPage page="register" />} />\  
      <Route path="/forgot-password" element={<AuthPage page="forgot-password" />} />
      <Route path="/change_password" element={<AuthPage page="change_password" />} />
      {/* Private routes */}
      <Route path="/QRScan" element={<PrivateRoute><QRScan /></PrivateRoute>} />
      <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
    </Routes>
  );
}
