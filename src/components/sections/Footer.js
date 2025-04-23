import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Navigation from "./Navigation";
import Hamburger from "../reusable/Hamburger/Hamburger";
import { useTranslation } from "react-i18next";
import { useAuth } from "../pages/authPage/utils/AuthProvider";

export default function Footer() {
  const [infoBoxOpen, setInfoBoxOpen] = useState(false);
  const infoBoxRef = useRef(null);
  const toggleRef = useRef(null);
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language.slice(0, 2);
  const otherLang = currentLang === "en" ? "ka" : "en"; // flip
  const otherLabel = otherLang === "en" ? "EN" : "GE"; // what to show

  const { token } = useAuth();
  /**
   * Changes the language of the application.
   * @param {string} lang - language code, e.g. 'en' or 'ka'
   */
  const switchLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  function handleInfoToggle() {
    setInfoBoxOpen(!infoBoxOpen);
  }
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        infoBoxRef.current &&
        !infoBoxRef.current.contains(event.target) &&
        toggleRef.current &&
        !toggleRef.current.contains(event.target)
      ) {
        setInfoBoxOpen(false);
      }
    };
    const handleScroll = () => {
      setInfoBoxOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <section className="header-box">
        {/* Regular Navigation */}
        <Link className="side-nav-bar" to="/">
          <img
            src="https://myphotostorage.blob.core.windows.net/mymakerphotos/7d69a115-b47f-4803-a627-485f86ef5c95.jpg"
            alt="Makerspace logo"
            className="nav-image"
          />
          <Navigation device="desktop" />
        </Link>

        {/* Footer Section */}
        <section className="bar-info">
          <section className="footer-menu">
            <Link className="footer-links" to="/About">
              <h3>{t("about_us")}</h3>
            </Link>
            <a
              className="footer-links"
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.google.com/maps/dir//Makerspace,+Lado+Gudiashvili+Square,+Tbilisi+0162,+Georgia/@41.6909958,44.8035254,17z/data=!4m7!4m6!1m1!4e2!1m2!1m1!1s0x40440d9a3542444f:0xc579f4ed091da767!3e0?source=lnms"
            >
              <h3>{t("location")}</h3>
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
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="25"
                height="25"
                viewBox="0 0 48 48"
              >
                <radialGradient
                  id="yOrnnhliCrdS2gy~4tD8ma_Xy10Jcu1L2Su_gr1"
                  cx="19.38"
                  cy="42.035"
                  r="44.899"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0" stop-color="#fd5"></stop>
                  <stop offset=".328" stop-color="#ff543f"></stop>
                  <stop offset=".348" stop-color="#fc5245"></stop>
                  <stop offset=".504" stop-color="#e64771"></stop>
                  <stop offset=".643" stop-color="#d53e91"></stop>
                  <stop offset=".761" stop-color="#cc39a4"></stop>
                  <stop offset=".841" stop-color="#c837ab"></stop>
                </radialGradient>
                <path
                  fill="url(#yOrnnhliCrdS2gy~4tD8ma_Xy10Jcu1L2Su_gr1)"
                  d="M34.017,41.99l-20,0.019c-4.4,0.004-8.003-3.592-8.008-7.992l-0.019-20	c-0.004-4.4,3.592-8.003,7.992-8.008l20-0.019c4.4-0.004,8.003,3.592,8.008,7.992l0.019,20	C42.014,38.383,38.417,41.986,34.017,41.99z"
                ></path>
                <radialGradient
                  id="yOrnnhliCrdS2gy~4tD8mb_Xy10Jcu1L2Su_gr2"
                  cx="11.786"
                  cy="5.54"
                  r="29.813"
                  gradientTransform="matrix(1 0 0 .6663 0 1.849)"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0" stop-color="#4168c9"></stop>
                  <stop
                    offset=".999"
                    stop-color="#4168c9"
                    stop-opacity="0"
                  ></stop>
                </radialGradient>
                <path
                  fill="url(#yOrnnhliCrdS2gy~4tD8mb_Xy10Jcu1L2Su_gr2)"
                  d="M34.017,41.99l-20,0.019c-4.4,0.004-8.003-3.592-8.008-7.992l-0.019-20	c-0.004-4.4,3.592-8.003,7.992-8.008l20-0.019c4.4-0.004,8.003,3.592,8.008,7.992l0.019,20	C42.014,38.383,38.417,41.986,34.017,41.99z"
                ></path>
                <path
                  fill="#fff"
                  d="M24,31c-3.859,0-7-3.14-7-7s3.141-7,7-7s7,3.14,7,7S27.859,31,24,31z M24,19c-2.757,0-5,2.243-5,5	s2.243,5,5,5s5-2.243,5-5S26.757,19,24,19z"
                ></path>
                <circle cx="31.5" cy="16.5" r="1.5" fill="#fff"></circle>
                <path
                  fill="#fff"
                  d="M30,37H18c-3.859,0-7-3.14-7-7V18c0-3.86,3.141-7,7-7h12c3.859,0,7,3.14,7,7v12	C37,33.86,33.859,37,30,37z M18,13c-2.757,0-5,2.243-5,5v12c0,2.757,2.243,5,5,5h12c2.757,0,5-2.243,5-5V18c0-2.757-2.243-5-5-5H18z"
                ></path>
              </svg>
            </a>
            <a
              className="hover-effect"
              href="https://www.facebook.com/Makerspacebar?mibextid=LQQJ4d"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="25"
                height="25"
                viewBox="0 0 48 48"
              >
                <path
                  fill="#3F51B5"
                  d="M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5V37z"
                ></path>
                <path
                  fill="#FFF"
                  d="M34.368,25H31v13h-5V25h-3v-4h3v-2.41c0.002-3.508,1.459-5.59,5.592-5.59H35v4h-2.287C31.104,17,31,17.6,31,18.723V21h4L34.368,25z"
                ></path>
              </svg>
            </a>
            <a
              className="hover-effect"
              href="https://www.instagram.com/makerspacebar/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="30"
                height="30"
                viewBox="0 0 48 48"
              >
                <path
                  fill="#FF3D00"
                  d="M43.2,33.9c-0.4,2.1-2.1,3.7-4.2,4c-3.3,0.5-8.8,1.1-15,1.1c-6.1,0-11.6-0.6-15-1.1c-2.1-0.3-3.8-1.9-4.2-4C4.4,31.6,4,28.2,4,24c0-4.2,0.4-7.6,0.8-9.9c0.4-2.1,2.1-3.7,4.2-4C12.3,9.6,17.8,9,24,9c6.2,0,11.6,0.6,15,1.1c2.1,0.3,3.8,1.9,4.2,4c0.4,2.3,0.9,5.7,0.9,9.9C44,28.2,43.6,31.6,43.2,33.9z"
                ></path>
                <path fill="#FFF" d="M20 31L20 17 32 24z"></path>
              </svg>
            </a>
          </section>
          <section className="translate-icon" ref={toggleRef}>
            <div  style={{ display: "flex", alignItems: "center" }}>
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 48 48">
<path fill="#CFD8DC" d="M15,13h25c1.104,0,2,0.896,2,2v25c0,1.104-0.896,2-2,2H26L15,13z"></path><path fill="#546E7A" d="M26.832,34.854l-0.916-1.776l0.889-0.459c0.061-0.031,6.101-3.208,9.043-9.104l0.446-0.895l1.79,0.893l-0.447,0.895c-3.241,6.496-9.645,9.85-9.916,9.989L26.832,34.854z"></path><path fill="#546E7A" d="M38.019 34l-.87-.49c-.207-.116-5.092-2.901-8.496-7.667l1.627-1.162c3.139 4.394 7.805 7.061 7.851 7.087L39 32.26 38.019 34zM26 22H40V24H26z"></path><path fill="#546E7A" d="M32 20H34V24H32z"></path><path fill="#2196F3" d="M33,35H8c-1.104,0-2-0.896-2-2V8c0-1.104,0.896-2,2-2h14L33,35z"></path><path fill="#3F51B5" d="M26 42L23 35 33 35z"></path><path fill="#FFF" d="M19.172,24h-4.36l-1.008,3H11l4.764-13h2.444L23,27h-2.805L19.172,24z M15.444,22h3.101l-1.559-4.714L15.444,22z"></path>
</svg>
              <button
                onClick={() => switchLanguage(otherLang)}
                className="lang-text"
              >
                {otherLabel}
              </button>{" "}
            </div>
          </section>

          {/* Hamburger / Info Box Toggle */}
          <Hamburger onClick={handleInfoToggle} open={infoBoxOpen} />
          {infoBoxOpen && (
            <section className="info-box" ref={infoBoxRef}>
              <pre>
                <>
                  <section className="mobile-menu">
                    <Link className="hover-effect" to="/Djs">
                      <h1>{t("dj_booking")}</h1>
                    </Link>
                    <Link className="hover-effect" to="/Gallery">
                      <h1>{t("gallery")}</h1>
                    </Link>
                    <section className="mobile-menu-login">
                      {token ? (
                        <Link className="hover-effect" to="/profile">
                          <h1>{t("profile")}</h1>
                          {/* Profile icon SVG */}
                        </Link>
                      ) : (
                        <Link className="hover-effect" to="/login">
                          <h1>{t("login")}</h1>
                          {/* Login icon SVG */}
                        </Link>
                      )}
                    </section>
                  </section>
                  <section className="footer-menu-mobile">
                    <h2>{t("company")}</h2>
                    <Link className="footer-links" to="/About">
                      <h3>{t("about_us")}</h3>
                    </Link>
                    <a
                      className="footer-links"
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://www.google.com/maps/dir//Makerspace,+Lado+Gudiashvili+Square,+Tbilisi+0162,+Georgia/@41.6909958,44.8035254,17z/data=!4m7!4m6!1m1!4e2!1m2!1m1!1s0x40440d9a3542444f:0xc579f4ed091da767!3e0?source=lnms"
                    >
                      <h3>{t("location")}</h3>
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
                    {token && (
                      <Link className="hover-effect" to="/Cart">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="20 20 576 512"
                          width="20"
                          height="20"
                          fill="currentColor"
                        >
                          <path d="M0 24C0 10.7 10.7 0 24 0L69.5 0c22 0 41.5 12.8 50.6 32l411 0c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3l-288.5 0 5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5L488 336c13.3 0 24 10.7 24 24s-10.7 24-24 24l-288.3 0c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5L24 48C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" />
                        </svg>
                      </Link>
                    )}
                  </section>
         
                    <div ref={toggleRef} style={{ display: "flex", alignItems: "center" }}>
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 48 48">
<path fill="#CFD8DC" d="M15,13h25c1.104,0,2,0.896,2,2v25c0,1.104-0.896,2-2,2H26L15,13z"></path><path fill="#546E7A" d="M26.832,34.854l-0.916-1.776l0.889-0.459c0.061-0.031,6.101-3.208,9.043-9.104l0.446-0.895l1.79,0.893l-0.447,0.895c-3.241,6.496-9.645,9.85-9.916,9.989L26.832,34.854z"></path><path fill="#546E7A" d="M38.019 34l-.87-.49c-.207-.116-5.092-2.901-8.496-7.667l1.627-1.162c3.139 4.394 7.805 7.061 7.851 7.087L39 32.26 38.019 34zM26 22H40V24H26z"></path><path fill="#546E7A" d="M32 20H34V24H32z"></path><path fill="#2196F3" d="M33,35H8c-1.104,0-2-0.896-2-2V8c0-1.104,0.896-2,2-2h14L33,35z"></path><path fill="#3F51B5" d="M26 42L23 35 33 35z"></path><path fill="#FFF" d="M19.172,24h-4.36l-1.008,3H11l4.764-13h2.444L23,27h-2.805L19.172,24z M15.444,22h3.101l-1.559-4.714L15.444,22z"></path>
</svg>
                      <button
                        onClick={() => switchLanguage(otherLang)}
                        className="lang-text"
                      >
                        {otherLabel}
                      </button>{" "}
                    </div>
          
                </>
              </pre>
            </section>
          )}
        </section>
      </section>
    </>
  );
}
