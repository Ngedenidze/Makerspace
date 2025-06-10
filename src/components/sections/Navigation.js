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
        
        </section>
              {token && (
           <Link className="hover-effect only-mobile" to="/Cart" style={{ position: "relative" }}>

                <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    width={25}
    height={25}
    viewBox="0 0 463 463"
    fill="currentColor"
  >
    <path d="M455.5 191a7.5 7.5 0 0 0 7.5-7.5v-48c0-12.958-10.542-23.5-23.5-23.5h-416C10.542 112 0 122.542 0 135.5v48a7.5 7.5 0 0 0 7.5 7.5c22.332 0 40.5 18.168 40.5 40.5S29.832 272 7.5 272a7.5 7.5 0 0 0-7.5 7.5v48C0 340.458 10.542 351 23.5 351h416c12.958 0 23.5-10.542 23.5-23.5v-48a7.5 7.5 0 0 0-7.5-7.5c-22.332 0-40.5-18.168-40.5-40.5s18.168-40.5 40.5-40.5zM400 231.5c0 28.061 20.93 51.324 48 54.995V327.5c0 4.687-3.813 8.5-8.5 8.5h-80.525c.011-.166.025-.331.025-.5v-16c0-4.143-3.358-7.5-7.5-7.5s-7.5 3.357-7.5 7.5v16c0 .169.014.334.025.5H23.5c-4.687 0-8.5-3.813-8.5-8.5v-41.005c27.07-3.671 48-26.935 48-54.995s-20.93-51.324-48-54.995V135.5c0-4.687 3.813-8.5 8.5-8.5h320.526c-.011.166-.025.331-.025.5v16c0 4.143 3.358 7.5 7.5 7.5s7.5-3.357 7.5-7.5v-16c0-.169-.014-.334-.025-.5H439.5c4.687 0 8.5 3.813 8.5 8.5v41.005c-27.069 3.671-48 26.935-48 54.995z" />
    <path d="M351.5 216a7.5 7.5 0 0 0-7.5 7.5v16c0 4.143 3.358 7.5 7.5 7.5s7.5-3.357 7.5-7.5v-16a7.5 7.5 0 0 0-7.5-7.5zM351.5 168a7.5 7.5 0 0 0-7.5 7.5v16c0 4.143 3.358 7.5 7.5 7.5s7.5-3.357 7.5-7.5v-16a7.5 7.5 0 0 0-7.5-7.5zM351.5 264a7.5 7.5 0 0 0-7.5 7.5v16c0 4.143 3.358 7.5 7.5 7.5s7.5-3.357 7.5-7.5v-16a7.5 7.5 0 0 0-7.5-7.5zM295.5 160h-184c-8.547 0-15.5 6.953-15.5 15.5v112c0 8.547 6.953 15.5 15.5 15.5h184c8.547 0 15.5-6.953 15.5-15.5v-112c0-8.547-6.953-15.5-15.5-15.5zm.5 127.5a.5.5 0 0 1-.5.5h-184a.5.5 0 0 1-.5-.5v-112a.5.5 0 0 1 .5-.5h184a.5.5 0 0 1 .5.5v112z" />
    <path d="M263.5 208h-120c-4.142 0-7.5 3.357-7.5 7.5s3.358 7.5 7.5 7.5h120c4.142 0 7.5-3.357 7.5-7.5s-3.358-7.5-7.5-7.5zM167.5 240h-24c-4.142 0-7.5 3.357-7.5 7.5s3.358 7.5 7.5 7.5h24c4.142 0 7.5-3.357 7.5-7.5s-3.358-7.5-7.5-7.5zM263.5 240h-64c-4.142 0-7.5 3.357-7.5 7.5s3.358 7.5 7.5 7.5h64c4.142 0 7.5-3.357 7.5-7.5s-3.358-7.5-7.5-7.5z" />
  </svg>
              {cartCount > 0 && (
            <div className="cart-indicator">
              {cartCount}
            </div>
          )}
            </Link>

          )}
      </menu>
    </section>
  );
}