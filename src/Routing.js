import { Routes, Route, Navigate } from "react-router-dom";
import Homepage from "./components/pages/Home Page/HomePage";
import About from "./components/pages/About/About";
import EventPage from "./components/pages/Event Page/EventPage";
import Rentals from "./components/pages/Home Page/sections/Rentals";
import Events from "./components/pages/All Events/AllEvents";
import DJs from "./components/pages/DJ Booking/DJs";
import AuthPage from "./components/pages/authPage/AuthPage";
import Profile from "./components/pages/User Profile/Profile";
import Gallery from "./components/pages/Gallery/Gallery";
import AdminQRScanner from "./components/pages/Qr scan/AdminQRScanner";
import { useAuth } from "./components/pages/authPage/utils/AuthProvider"; 
import AdminPrivateRoute from "./components/reusable/Admin Route/AdminPrivateRoute";
import CartPage from "./components/pages/Cart/CartPage";
import SuccessPayment from "./components/pages/Payment Handling/SuccessPayement";
import FailPayment from "./components/pages/Payment Handling/FailPayment";
import TermsAndConditions from "./components/pages/Terms and Conditions/TermsAndConditions";
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
      <Route path="/Rentals" element={<Rentals />} />
      <Route path="/Cart" element={<CartPage />} />
      <Route path="/AllEvents" element={<Events />} />
      <Route path="/AllEvents/:tab" element={<Events />} />
      <Route path="/Events/:id" element={<EventPage />} />
      <Route path="/DJs" element={<DJs />} />
      <Route path="/terms" element={<TermsAndConditions />} />
      <Route path="/successpayment" element={<SuccessPayment />} />
      <Route path="/failpayment" element={<FailPayment />} />
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
