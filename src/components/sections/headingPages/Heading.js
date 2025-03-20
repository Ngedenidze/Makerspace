import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Navigation from "../../Navigation";
import Hamburger from "../../reusable/Hamburger/Hamburger";

const apiUrl =
  process.env.NODE_ENV === "production"
    ? "https://makerspace-cffwdbazgbh3ftdq.westeurope-01.azurewebsites.net"
    : "";

export default function Heading() {
  const [infoBoxOpen, setInfoBoxOpen] = useState(false);
  const [user, setUser] = useState(null); // <-- Track user state

  // Function to handle toggle
  function handleInfoToggle() {
    setInfoBoxOpen(!infoBoxOpen);
  }

  // Check if user is authenticated
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      // No token => user is not logged in
      setUser(null);
      return;
    }

    // If token exists, fetch user data
    axios
      .get(`${apiUrl}/api/users/me`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const data = res.data;
        if (data && data.id > 0) {
          setUser(data);
        } else {
          // If response doesn't contain valid user data, treat as not logged in
          localStorage.removeItem("authToken");
          setUser(null);
        }
      })
      .catch((error) => {
        console.error(
          "Error fetching user in Heading:",
          error.response?.data || error.message
        );
        // If invalid token or error, remove token
        localStorage.removeItem("authToken");
        setUser(null);
      });
  }, []);
  return (
    <>
      <section className="header-box">
        {/* Regular Navigation */}
        <Link className="side-nav-bar" to="/">
          <img
            src={
              "https://myphotostorage.blob.core.windows.net/mymakerphotos/7d69a115-b47f-4803-a627-485f86ef5c95.jpg"
            }
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
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.google.com/maps/dir//Makerspace,+Lado+Gudiashvili+Square,+Tbilisi+0162,+Georgia/@41.6909958,44.8035254,17z/data=!4m7!4m6!1m1!4e2!1m2!1m1!1s0x40440d9a3542444f:0xc579f4ed091da767!3e0?source=lnms"
            >
              <h3>Location</h3>
            </a>
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
              href="https://www.facebook.com/Makerspacebar?mibextid=LQQJ4d"
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
            {user ? (
              <Link className="hover-effect" to="/profile">
                <svg
                  fill="currentColor"
                  width="25px"
                  height="25px"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Profile icon SVG */}
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </Link>
            ) : (
              <Link className="hover-effect" to="/login">
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
              </Link>
            )}
          </section>
          <section>
            <div className="translate-icon">
              <svg
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="25"
                height="25"
              >
                <path d="M 5 3 C 3.9069372 3 3 3.9069372 3 5 L 3 16 C 3 17.093063 3.9069372 18 5 18 L 7 18 L 12 18 L 12 22 L 8 22 L 8 19 L 7 18 L 6 19 L 6 22 L 8 24 L 12 24 L 12 25 C 12 26.105 12.895 27 14 27 L 25 27 C 26.105 27 27 26.105 27 25 L 27 14 C 27 12.895 26.105 12 25 12 L 18 12 L 18 5 C 18 3.9069372 17.093063 3 16 3 L 5 3 z M 5 5 L 16 5 L 16 12 L 14 12 C 12.895 12 12 12.895 12 14 L 12 16 L 5 16 L 5 5 z M 12 14 L 12 13 C 11.755293 13 11.521351 12.969766 11.291016 12.933594 C 11.314874 12.916254 11.341774 12.902596 11.365234 12.884766 C 12.436415 12.070668 13 10.75101 13 9 L 14 9 L 14 8 L 11 8 L 11 6.5 L 10 6.5 L 10 8 L 7 8 L 7 9 L 12 9 C 12 10.54899 11.563585 11.478941 10.759766 12.089844 C 10.53998 12.25688 10.278088 12.396887 9.9902344 12.517578 C 9.667359 12.357894 9.3640918 12.177141 9.109375 11.962891 C 8.3922951 11.359732 8 10.591752 8 10 L 7 10 C 7 10.997248 7.5736736 11.978924 8.4648438 12.728516 C 8.5238513 12.778149 8.5962189 12.817683 8.6582031 12.865234 C 8.1567671 12.945359 7.6170728 13 7 13 L 7 14 C 8.1153185 14 9.1081165 13.884672 9.9570312 13.605469 C 10.57585 13.850013 11.261979 14 12 14 z M 18.402344 15.976562 L 20.59375 15.976562 L 22.962891 23.023438 L 21.009766 23.023438 L 20.570312 21.474609 L 18.269531 21.474609 L 17.816406 23.023438 L 16.039062 23.023438 L 18.402344 15.976562 z M 19.382812 17.564453 L 18.611328 20.185547 L 20.232422 20.185547 L 19.476562 17.564453 L 19.382812 17.564453 z"></path>
              </svg>
            </div>
          </section>

          {/* Hamburger / Info Box Toggle */}
          <Hamburger onClick={handleInfoToggle} open={infoBoxOpen} />
          {infoBoxOpen && (
            <section className="info-box">
              <pre>
                <>
                  <section className="mobile-menu">
                    <Link className="hover-effect" to="/Djs">
                      <h1>DJ Booking</h1>
                    </Link>
                    <Link className="hover-effect" to="/Gallery">
                      <h1>Gallery</h1>
                    </Link>
                    <section className="mobile-menu-login">
                      {user ? (
                        <Link className="hover-effect" to="/profile">
                          <h1>Profile</h1>
                          <svg
                            fill="currentColor"
                            width="30px"
                            height="30px"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                          </svg>
                        </Link>
                      ) : (
                        <Link className="hover-effect" to="/login">
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
                        </Link>
                      )}
                    </section>
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
              </pre>
            </section>
          )}
        </section>
      </section>
    </>
  );
}
