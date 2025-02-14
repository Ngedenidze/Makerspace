import HeroImage from "../../../assets/food/food4.webp";
import React, { useState } from "react";
import Navigation from "../../Navigation";
import Hamburger from "../../../assets/hamburger.png";
import Close from "../../../assets/close.png";
export default function Heading() {
  const [navbarOpen, setNavbarOpen] = useState(false);
  function handleToggle() {
    setNavbarOpen(!navbarOpen);
  }
  return (
    <>
    <header className="reserve-table">
         <nav>
            <nav className="burger">
              <img
                src={require("../../../assets/nav-logo.png")}
                alt="Oasis Diner logo"
                className="nav-image"
              ></img>

              <button className="burger-icon" onClick={handleToggle}>
                <img
                  src={navbarOpen ? Close : Hamburger}
                  alt="Navigation Bar"
                />
              </button>
            </nav>
            <Navigation device="desktop" to="/Home" />
            {navbarOpen ? <Navigation device="mobile"/> : ""}
          </nav>
     
    </header>
      {/* <div className="reserve-header-text">
        <h1>Reserve a table</h1>
      </div>  */}
    </>
  );
}
