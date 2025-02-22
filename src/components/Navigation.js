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
        <Link className="hover-effect" to="/Events">
          <h1>Events</h1>
        </Link>
        <Link className="hover-effect" to="/Account">
          <h1>Gallery</h1>
        </Link>
        <Link className="hover-effect" to="/About">
          <h1>About</h1>
        </Link>
        <a
          className="hover-effect"
          href="/Account"
          target="_blank"
          rel="noopener noreferrer"
        >
   <svg   fill="currentColor"
            width="30px"
            height="30px" xmlns="http://www.w3.org/2000/svg"><g><path d="M0 0h24v24H0z" fill="none"/><path d="M4 15h2v5h12V4H6v5H4V3a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6zm6-4V8l5 4-5 4v-3H2v-2h8z"/></g></svg>
        </a>
      </menu>
    </section>
  );
}
