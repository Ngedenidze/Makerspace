import React, { useState } from "react";
import Navigation from "../../Navigation";
import Hamburger from "../../../assets/hamburger.png";
import Close from "../../../assets/close.png";
import ScrollDownArrow from "./ScrollDownArrow";
import { Link } from "react-router-dom";

export default function Heading({ scrollToSpecials, scrollToAbout }) {
  const [navbarOpen, setNavbarOpen] = useState(false);
  function handleToggle() {
    setNavbarOpen(!navbarOpen);
  }

  return (
    <>
      <header className="header-menu">
        <section className="header-box">
          <nav className="side-nav-bar">
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
            <Navigation device="desktop" onAboutClick={scrollToAbout} />
            {navbarOpen ? (
              <Navigation
                device="mobile"
                onSpecialsClick={scrollToSpecials}
                onAboutClick={scrollToAbout}
              />
            ) : (
              ""
            )}
          </nav>
          <section className="bar-info">
            <section className="footer-info">
              <h2>Location</h2>
              <h3>Butler, NJ</h3>
              <h3>1277 NJ-23</h3>
            </section>
            <section className="footer-menu">
              <Link className="footer-links">
                <a href="" >
            
                  <h3>Footer 1</h3>
                </a>
              </Link>
              <Link className="footer-links">
                <a href="" >
              
                  <h3>Footer 2</h3>
                </a>
              </Link>
              <Link className="footer-links">
                <a href="" >
          
                  <h3>Footer 3</h3>
                </a>
              </Link>
            </section>
          </section>
        </section>
      </header>
    </>
  );
}
