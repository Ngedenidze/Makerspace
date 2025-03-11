import React, { useState } from "react";
import Navigation from "../../Navigation";
import { Link } from "react-router-dom";

export default function Heading() {
  // State to toggle the info box
  const [infoBoxOpen, setInfoBoxOpen] = useState(false);

  // Function to handle toggle
  function handleInfoToggle() {
    setInfoBoxOpen(!infoBoxOpen);
  }

  return (
    <>
      <section className="header-box">
        {/* Regular Navigation */}
        <Link className="side-nav-bar" to="/">
          <img
            src={"https://myphotostorage.blob.core.windows.net/mymakerphotos/7d69a115-b47f-4803-a627-485f86ef5c95.jpg"}
            alt="Makerspace logo"
            className="nav-image"
          />
          <Navigation device="desktop" />
        </Link>

        {/* Footer Section */}
        <section className="bar-info">
          <section className="footer-menu">
            <Link className="footer-links" to="/About">
              <h3>About us</h3>
            </Link>
            <a
              className="footer-links"
              href="https://www.google.com/maps/dir//Makerspace,+Lado+Gudiashvili+Square,+Tbilisi+0162,+Georgia/@41.6909958,44.8035254,17z/data=!4m7!4m6!1m1!4e2!1m2!1m1!1s0x40440d9a3542444f:0xc579f4ed091da767!3e0?source=lnms"
            >
              <h3>Location</h3>
            </a>
            {/* <Link className="footer-links" to="/contact">
              <h3>Contact Us</h3>
            </Link> */}
   
          </section>
          <section className="socials">
            <a
              className="hover-effect"
              href="https://www.instagram.com/makerspace_club/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                fill="currentColor"
                width="25px"
                height="25px"
                viewBox="-2 -2 24 24"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="xMinYMin"
                className="jam jam-instagram"
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
              <svg
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="25"
                height="25"
                viewBox="0 0 24 24"
              >
                <path d="M 12 2 C 6.4889971 2 2 6.4889971 2 12 C 2 17.511003 6.4889971 22 12 22 C 17.511003 22 22 17.511003 22 12 C 22 6.4889971 17.511003 2 12 2 z M 12 4 C 16.430123 4 20 7.5698774 20 12 C 20 16.014467 17.065322 19.313017 13.21875 19.898438 L 13.21875 14.384766 L 15.546875 14.384766 L 15.912109 12.019531 L 13.21875 12.019531 L 13.21875 10.726562 C 13.21875 9.7435625 13.538984 8.8710938 14.458984 8.8710938 L 15.935547 8.8710938 L 15.935547 6.8066406 C 15.675547 6.7716406 15.126844 6.6953125 14.089844 6.6953125 C 11.923844 6.6953125 10.654297 7.8393125 10.654297 10.445312 L 10.654297 12.019531 L 8.4277344 12.019531 L 8.4277344 14.384766 L 10.654297 14.384766 L 10.654297 19.878906 C 6.8702905 19.240845 4 15.970237 4 12 C 4 7.5698774 7.5698774 4 12 4 z"></path>
              </svg>
            </a>
            {/* <a
              className="hover-effect"
              href="/#/login"
              rel="noopener noreferrer"
              viewBox="0 0 24 24"
            >
              <svg
                fill="currentColor"
                width="25px"
                height="25px"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g>
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path d="M4 15h2v5h12V4H6v5H4V3a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6zm6-4V8l5 4-5 4v-3H2v-2h8z" />
                </g>
              </svg>
            </a> */}
          </section>

          {/* 3 Dots Toggle for Info Box */}
          <button className="three-dots-toggle" onClick={handleInfoToggle}>
            ...
          </button>
          {infoBoxOpen && (
            <section className="info-box">
              <pre>
                {
                  <>
                    <section className="mobile-menu">
                      <Link className="hover-effect" to="/Djs">
                        <h1>DJ Booking</h1>
                      </Link>
                      <Link className="hover-effect" to="/Gallery">
                        <h1>Gallery</h1>
                      </Link>
                      {/* <section className="mobile-menu-login">
                      <a
                        className="hover-effect"
                        href="/#/login"
                        rel="noopener noreferrer"
                      >
                        <h1>Login</h1>
                        <svg
                          fill="currentColor"
                          width="30px"
                          height="30px"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g>
                            <path d="M0 0h24v24H0z" fill="none" />
                            <path d="M4 15h2v5h12V4H6v5H4V3a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6zm6-4V8l5 4-5 4v-3H2v-2h8z" />
                          </g>
                        </svg>
                        
                      </a>
                      </section> */}
                    </section>
                    <section className="footer-menu-mobile">
                      <h2>Company</h2>
                      <Link className="footer-links" to="/About">
                        <h3>About us</h3>
                      </Link>
                      <a
                        className="footer-links"
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://www.google.com/maps/dir//Makerspace,+Lado+Gudiashvili+Square,+Tbilisi+0162,+Georgia/@41.6909958,44.8035254,17z/data=!4m7!4m6!1m1!4e2!1m2!1m1!1s0x40440d9a3542444f:0xc579f4ed091da767!3e0?source=lnms"
                      >
                        <h3>Location</h3>
                      </a>
                      {/* <Link className="footer-links" to="/contact">
                        <h3>Contact Us</h3>
                      </Link> */}
                    </section>
                    <section className="socials-mobile">
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
                          className="jam jam-instagram"
                        >
                          <path d="M14.017 0h-8.07A5.954 5.954 0 0 0 0 5.948v8.07a5.954 5.954 0 0 0 5.948 5.947h8.07a5.954 5.954 0 0 0 5.947-5.948v-8.07A5.954 5.954 0 0 0 14.017 0zm3.94 14.017a3.94 3.94 0 0 1-3.94 3.94h-8.07a3.94 3.94 0 0 1-3.939-3.94v-8.07a3.94 3.94 0 0 1 3.94-3.939h8.07a3.94 3.94 0 0 1 3.939 3.94v8.07z" />
                          <path d="M9.982 4.819A5.17 5.17 0 0 0 4.82 9.982a5.17 5.17 0 0 0 5.163 5.164 5.17 5.17 0 0 0 5.164-5.164A5.17 5.17 0 0 0 9.982 4.82zm0 8.319a3.155 3.155 0 1 1 0-6.31 3.155 3.155 0 0 1 0 6.31z" />
                          <circle cx="15.156" cy="4.858" r="1.237" />
                        </svg>
                      </a>
                      <a
                        className="hover-effect"
                        href="https://www.facebook.com/Makerspacebar?mibextid=LQQJ4d"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <svg
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                          x="0px"
                          y="0px"
                          width="30"
                          height="30"
                          viewBox="0 0 24 24"
                        >
                          <path d="M 12 2 C 6.4889971 2 2 6.4889971 2 12 C 2 17.511003 6.4889971 22 12 22 C 17.511003 22 22 17.511003 22 12 C 22 6.4889971 17.511003 2 12 2 z M 12 4 C 16.430123 4 20 7.5698774 20 12 C 20 16.014467 17.065322 19.313017 13.21875 19.898438 L 13.21875 14.384766 L 15.546875 14.384766 L 15.912109 12.019531 L 13.21875 12.019531 L 13.21875 10.726562 C 13.21875 9.7435625 13.538984 8.8710938 14.458984 8.8710938 L 15.935547 8.8710938 L 15.935547 6.8066406 C 15.675547 6.7716406 15.126844 6.6953125 14.089844 6.6953125 C 11.923844 6.6953125 10.654297 7.8393125 10.654297 10.445312 L 10.654297 12.019531 L 8.4277344 12.019531 L 8.4277344 14.384766 L 10.654297 14.384766 L 10.654297 19.878906 C 6.8702905 19.240845 4 15.970237 4 12 C 4 7.5698774 7.5698774 4 12 4 z"></path>
                        </svg>
                      </a>
                    </section>
                  </>
                }
              </pre>
            </section>
          )}
        </section>
      </section>
    </>
  );
}
