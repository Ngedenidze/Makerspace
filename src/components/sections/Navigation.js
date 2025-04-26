import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { useAuth } from "../pages/authPage/utils/AuthProvider";
import CartContext from "../pages/Cart/CartContext";
import logo from "./../../assets/ms_logo.jpg"

export default function Navigation({ device, onSpecialsClick, onAboutClick }) {
  const { t } = useTranslation();
  const { token } = useAuth(); // Assume that 'token' exists if the user is signed in.
  const { cart, dispatch } = useContext(CartContext);
  const cartCount = cart.items.reduce((total, item) => total + item.quantity, 0);
  
  return (
    <section className="navbar-stack">
      <div className="nav-bar-title">
        {/* Optionally, add a translated title if needed */}
      </div>
      {device === "mobile" ? (
        ""
      ) : (
        <div className="nav-bar-logo">
          <img
            src={require("../../assets/ms-name-red.png")}
            alt={t("makerspace_logo")}
            className="nav-title-logo"
          />
          <Link to="/">
            <img
              src={
                logo
              }
              alt={t("little_lemon_logo")}
              className="nav-image"
            />
          </Link>
        </div>
      )}
      <menu className={`navbar-menu ${device}`}>
        <Link className="hover-effect" to="/AllEvents">
          <h1>{t("events")}</h1>
        </Link>
        <Link className="hover-effect" to="/Rentals">
          <h1>{t("rentals")}</h1>
        </Link>
        <section className="desktop-menu">
          <Link className="hover-effect" to="/Djs">
            <h1>{t("djs")}</h1>
          </Link>
          <Link className="hover-effect" to="/gallery">
            <h1>{t("gallery")}</h1>
          </Link>
          {token ? (
              <Link className="hover-effect" to="/profile">
                <h1>{t("profile")}</h1>
              </Link>
            ) : (
              <Link className="hover-effect" to="/login">
                 <h1>{t("login")}</h1>
              </Link>
            )}
          {/* Render the Cart link only if the user is signed in (i.e. token exists) */}
          {token && (
           <Link className="hover-effect" to="/Cart" style={{ position: "relative" }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="20 20 576 512"
                width="25"
                height="25"
                fill="currentColor"
              >
                <path d="M0 24C0 10.7 10.7 0 24 0L69.5 0c22 0 41.5 12.8 50.6 32l411 0c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3l-288.5 0 5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5L488 336c13.3 0 24 10.7 24 24s-10.7 24-24 24l-288.3 0c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5L24 48C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" />
              </svg>
              {cartCount > 0 && (
            <div className="cart-indicator">
              {cartCount}
            </div>
          )}
            </Link>

          )}
        </section>
      </menu>
    </section>
  );
}