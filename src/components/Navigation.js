import { Link } from "react-router-dom";
import { useRef } from "react";

export default function Navigation({ device, onSpecialsClick, onAboutClick }) {
  return (
    <section className="navbar-stack">
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
        <Link className="hover-effect" to="/">
          <h1>Home</h1>
        </Link>
        <Link className="hover-effect" to="/reservations">
          <h1>Events</h1>
        </Link>
        <Link className="hover-effect" to="/Account">
          <h1>Gallery</h1>
        </Link>
        <Link className="hover-effect" to="/About">
          <h1>About</h1>
        </Link>
      </menu>
    </section>
  );
}
