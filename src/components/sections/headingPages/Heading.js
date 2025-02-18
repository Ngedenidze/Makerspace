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
             <a className="footer-links" href="https://www.google.com/maps?sca_esv=0c36c686c589dc21&output=search&q=makerspace+tbilisi&source=lnms&fbs=ABzOT_CWdhQLP1FcmU5B0fn3xuWpA-dk4wpBWOGsoR7DG5zJBv10Kbgy3ptSBM6mMfaz8zDVX4b2W1tiDkb3uUgOX2bJkgS24a4hEMkFu9wUyGFHJMOuKVUiSlASRG8DIeguSCGlrjXikgXnuRhXn5nr9VGq1g5zkyQD6un2r4KKBh7KOjCzBegtHJM4RYpW5V_vlPIP8eED_Z7LGWeglCrVwkFP5fnZtA&entry=mc&ved=1t:200715&ictx=111"> 
              <h2>Location</h2>
              <h3>Lado Gudiashvili Square</h3>
              <h3>Tbilisi 0162</h3>
              <h3>Georgia</h3>
              </a>
            </section>
            <section className="footer-menu">
              <Link className="footer-links">
                <a href="" >
              
                  <h3>Jobs</h3>
                </a>
              </Link>
              <Link className="footer-links">
                <a href="" >
          
                  <h3>Contact Us</h3>
                </a>
              </Link>
              
            </section>
            <section
        className="socials"
        >
        <a
          className="hover-effect"
          href="https://www.instagram.com/makerspace_club/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg
            fill="currentColor"
            width="30px"
            height="30px"
            viewBox="-2 -2 24 24"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMinYMin"
            class="jam jam-instagram"
          >
            <path d="M14.017 0h-8.07A5.954 5.954 0 0 0 0 5.948v8.07a5.954 5.954 0 0 0 5.948 5.947h8.07a5.954 5.954 0 0 0 5.947-5.948v-8.07A5.954 5.954 0 0 0 14.017 0zm3.94 14.017a3.94 3.94 0 0 1-3.94 3.94h-8.07a3.94 3.94 0 0 1-3.939-3.94v-8.07a3.94 3.94 0 0 1 3.94-3.939h8.07a3.94 3.94 0 0 1 3.939 3.94v8.07z" />
            <path d="M9.982 4.819A5.17 5.17 0 0 0 4.82 9.982a5.17 5.17 0 0 0 5.163 5.164 5.17 5.17 0 0 0 5.164-5.164A5.17 5.17 0 0 0 9.982 4.82zm0 8.319a3.155 3.155 0 1 1 0-6.31 3.155 3.155 0 0 1 0 6.31z" />
            <circle cx="15.156" cy="4.858" r="1.237" />
          </svg>
        </a>
        <a
          className="hover-effect"
          href="https://www.instagram.com/makerspace_club/"
          target="_blank"
          rel="noopener noreferrer"
        >
<svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 24 24">
<path d="M 12 2 C 6.4889971 2 2 6.4889971 2 12 C 2 17.511003 6.4889971 22 12 22 C 17.511003 22 22 17.511003 22 12 C 22 6.4889971 17.511003 2 12 2 z M 12 4 C 16.430123 4 20 7.5698774 20 12 C 20 16.014467 17.065322 19.313017 13.21875 19.898438 L 13.21875 14.384766 L 15.546875 14.384766 L 15.912109 12.019531 L 13.21875 12.019531 L 13.21875 10.726562 C 13.21875 9.7435625 13.538984 8.8710938 14.458984 8.8710938 L 15.935547 8.8710938 L 15.935547 6.8066406 C 15.675547 6.7716406 15.126844 6.6953125 14.089844 6.6953125 C 11.923844 6.6953125 10.654297 7.8393125 10.654297 10.445312 L 10.654297 12.019531 L 8.4277344 12.019531 L 8.4277344 14.384766 L 10.654297 14.384766 L 10.654297 19.878906 C 6.8702905 19.240845 4 15.970237 4 12 C 4 7.5698774 7.5698774 4 12 4 z"></path>
</svg>
        </a>
        </section> 
          </section>
        </section>
    </>
  );
}
