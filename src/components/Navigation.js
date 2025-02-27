import { Link } from "react-router-dom";
import { useRef } from "react";

export default function Navigation({ device, onSpecialsClick, onAboutClick }) {
  return (
    <section className="navbar-stack">
       <div className="nav-bar-title">
          <h1>Makerspace</h1>
          </div>
      {device === "mobile" ? (
        ""
      ) : (
        <Link className="nav-bar-logo" to="/">
          <img
            src={require("../assets/Logo.jpg")}
            alt="Little Lemon logo"
            className="nav-image"
          ></img>
        </Link>
      )}
      <menu className={`navbar-menu ${device}`}>
        <Link className="hover-effect" to="/AllEvents">
          <h1>Events</h1>
        </Link>
        <Link className="hover-effect" to="/Rentals">
          <h1>Rentals</h1>
        </Link>
        <section className="desktop-menu">
        <Link className="hover-effect" to="/Djs">
          <h1>DJs</h1>
        </Link>
       </section>
      </menu>
    </section>
  );
}
