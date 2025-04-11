import { Routes, Route, Navigate } from "react-router-dom";
import Homepage from "./pages/HomePage";
import About from "./pages/About";
import Reservation from "./pages/BookingPage";
import Order from "./pages/Order";
import Confirmation from "./pages/Confirmation";
import EventPage from "./pages/Event Page/EventPage";
import Rentals from "./pages/Rentals";
import Events from "./pages/Events";
import DJs from "./pages/DJ Booking/DJs";
import AuthPage from "./pages/authPage/AuthPage";
import Profile from "./pages/User Profile/Profile";
import Gallery from "./pages/Gallery/Gallery";
import AdminQRScanner from "./pages/Qr scan/AdminQRScanner";
import { useAuth } from "./pages/authPage/utils/AuthProvider"; 
import AdminPrivateRoute from "./reusable/Admin Route/AdminPrivateRoute";
import CartPage from "./reusable/Cart/CartPage";
function PrivateRoute({ children }) {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" />;
}

function PublicRoute({ children }) {
  const { token } = useAuth();
  return token ? <Navigate to="/profile" /> : children;
}

export default function Routing() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/about" element={<About />} />
      <Route path="/reservations" element={<Reservation />} />
      <Route path="/order" element={<Order />} />
      <Route path="/confirmation" element={<Confirmation />} />
      <Route path="/Rentals" element={<Rentals />} />
      <Route path="/Cart" element={<CartPage />} />
      <Route path="/AllEvents" element={<Events />} />
      <Route path="/AllEvents/:tab" element={<Events />} />
      <Route path="/Events/:id" element={<EventPage />} />
      <Route path="/DJs" element={<DJs />} />
      <Route path="/gallery" element={<Gallery />} />
      
      {/* Auth routes wrapped in PublicRoute */}
      <Route
        path="/login"
        element={
          <PublicRoute>
            <AuthPage page="login" />
          </PublicRoute>
        }
      />
      <Route
        path="/register"
        element={
          <PublicRoute>
            <AuthPage page="register" />
          </PublicRoute>
        }
      />
      <Route
        path="/forgot-password"
        element={
          <PublicRoute>
            <AuthPage page="forgot-password" />
          </PublicRoute>
        }
      />
      <Route
        path="/change_password"
        element={
          <PublicRoute>
            <AuthPage page="change_password" />
          </PublicRoute>
        }
      />
      
      {/* Private routes */}
      <Route
        path="/QRScan"
        element={
          <AdminPrivateRoute>
            <AdminQRScanner />
          </AdminPrivateRoute>
        }
      />
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
