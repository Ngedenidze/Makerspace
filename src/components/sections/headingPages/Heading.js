import React, { useState } from "react";
import Navigation from "../../Navigation";
import Hamburger from "../../../assets/hamburger.png";
import Close from "../../../assets/close.png";
import { Link } from "react-router-dom";

export default function Heading() {
  const [navbarOpen, setNavbarOpen] = useState(false);
  function handleToggle() {
    setNavbarOpen(!navbarOpen);
  }

  return (
    <>

        <section className="header-box">
          <nav className="side-nav-bar">
            <nav className="burger">
              <img
                src={require("../../../assets/makerspace.JPG")}
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
            <Navigation device="desktop" />
            {navbarOpen ? (
              <Navigation
                device="mobile"
              />
            ) : (
              ""
            )}
          </nav>
          <section className="bar-info">
            <section className="footer-info">
              <h2>Location</h2>
              <h3>Lado Gudiashvili Square</h3>
              <h3>Tbilisi 0162</h3>
              <h3>Georgia</h3>
            </section>
            <section className="footer-menu">
              <Link className="footer-links">
                <a href="" >
                  <h3>Comercial Renting</h3>
                </a>
              </Link>
              <Link className="footer-links">
                <a href="" >
              
                  <h3>Careers</h3>
                </a>
              </Link>
              <Link className="footer-links">
                <a href="" >
          
                  <h3>Contact</h3>
                </a>
              </Link>
            </section>
          </section>
        </section>
    </>
  );
}
