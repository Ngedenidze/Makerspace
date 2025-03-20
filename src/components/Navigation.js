import { Link } from "react-router-dom";
import { useRef } from "react";

export default function Navigation({ device, onSpecialsClick, onAboutClick }) {
  return (
    <section className="navbar-stack">
       <div className="nav-bar-title">
       
          </div>
      {device === "mobile" ? (
        ""
      ) : (
        <div className="nav-bar-logo">
        <h1>Makerspace</h1>
        <Link to="/">
          <img
            src={"https://myphotostorage.blob.core.windows.net/mymakerphotos/7d69a115-b47f-4803-a627-485f86ef5c95.jpg"}
            alt="Little Lemon logo"
            className="nav-image"
          ></img>
        </Link>
        </div>
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
        <Link className="hover-effect" to="/gallery">
              <h1>Gallery</h1>
          </Link> 
       </section>
      </menu>
    </section>
  );
}
