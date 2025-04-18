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
  const otherLang   = currentLang === "en" ? "ka" : "en"; // flip
  const otherLabel  = otherLang === "en" ? "EN" : "GE";   // what to show

  const {token} = useAuth();
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
   }   }, []);

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
            <a
            className="hover-effect"
            href="https://www.instagram.com/makerspacebar/"
            target="_blank"
            rel="noopener noreferrer">
           <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" x="0px" y="0px" width="25" height="25" viewBox="0 0 50 50">
<path d="M 9 4 C 6.2504839 4 4 6.2504839 4 9 L 4 41 C 4 43.749516 6.2504839 46 9 46 L 41 46 C 43.749516 46 46 43.749516 46 41 L 46 9 C 46 6.2504839 43.749516 4 41 4 L 9 4 z M 9 6 L 41 6 C 42.668484 6 44 7.3315161 44 9 L 44 41 C 44 42.668484 42.668484 44 41 44 L 9 44 C 7.3315161 44 6 42.668484 6 41 L 6 9 C 6 7.3315161 7.3315161 6 9 6 z M 15 8 C 15.414 9.013 17.402 13.381141 18 14.994141 L 18 19 L 20 19 L 20 15 L 23 8 L 20.599609 8 L 19 12 L 17.400391 8 L 15 8 z M 25 11 C 23.994 11 23.228969 11.275313 22.667969 11.945312 C 22.234969 12.440312 22.001953 13.23425 22.001953 14.28125 L 22 15.726562 C 22 16.767563 22.205672 17.487516 22.638672 17.978516 C 23.200672 18.645516 24.111 19 25 19 C 25.889 19 26.815906 18.645562 27.378906 17.976562 C 27.804906 17.486562 28 16.767562 28 15.726562 L 28 14.275391 C 28 13.227391 27.758031 12.440312 27.332031 11.945312 C 26.770031 11.275313 25.889 11 25 11 z M 29 11 L 29 16.837891 C 29 17.497891 29.098281 17.946375 29.238281 18.234375 C 29.468281 18.707375 29.928844 18.949703 30.589844 18.970703 C 31.500844 19.000703 32.185 18.41 33 17.625 L 33 19 L 35 19 L 35 11 L 33 11 L 33 16.375 C 32.545 16.914 32.021375 17.392578 31.609375 17.392578 C 31.336375 17.392578 31.05 17.267 31 17 L 31 11 L 29 11 z M 25 12.619141 C 25.552 12.619141 26 13.076625 26 13.640625 L 26 16.447266 C 26 17.010266 25.552 17.46875 25 17.46875 C 24.448 17.46875 24 17.011266 24 16.447266 L 24 13.640625 C 24 13.077625 24.448 12.619141 25 12.619141 z M 24.990234 22 C 24.990234 22 18.280781 22.000312 13.800781 22.320312 C 13.170781 22.390313 11.809844 22.400391 10.589844 23.650391 C 9.6298437 24.590391 9.3203125 26.75 9.3203125 26.75 C 9.3203125 26.75 9 28.280547 9 30.810547 L 9 33.179688 C 9 35.709688 9.3203125 37.240234 9.3203125 37.240234 C 9.3203125 37.240234 9.6298438 39.399609 10.589844 40.349609 C 11.809844 41.589609 13.409141 41.549688 14.119141 41.679688 C 16.679141 41.919688 25 42 25 42 C 25 42 31.719219 41.989922 36.199219 41.669922 C 36.829219 41.599922 38.190156 41.589844 39.410156 40.339844 C 40.370156 39.399844 40.679688 37.240234 40.679688 37.240234 C 40.679688 37.240234 41 35.709688 41 33.179688 L 41 30.810547 C 41 28.280547 40.679688 26.75 40.679688 26.75 C 40.679688 26.75 40.370156 24.590391 39.410156 23.650391 C 38.190156 22.400391 36.829219 22.390312 36.199219 22.320312 C 31.719219 22.000312 25.009766 22 25.009766 22 L 24.990234 22 z M 12 26 L 18 26 L 18 28 L 16 28 L 16 38 L 14 38 L 14 28 L 12 28 L 12 26 z M 25 26 L 27 26 L 27 30.380859 C 27.75 29.500859 28.149141 28.99 29.119141 29 C 29.879141 29.01 30.490234 29.440703 30.740234 30.220703 C 30.870234 30.640703 31 31.390859 31 32.380859 L 31 35.130859 C 30.99 36.010859 30.899297 36.400313 30.779297 36.820312 C 30.529297 37.600313 29.879141 38 29.119141 38 C 28.449141 38 27.63 37.53 27 36.75 L 27 38 L 25 38 L 25 26 z M 18 29 L 20 29 L 20 35.890625 C 20.05 36.180625 20.259531 36.289062 20.519531 36.289062 C 20.919531 36.289062 21.56 35.849531 22 35.269531 L 22 29 L 24 29 L 24 38 L 22 38 L 22 36.630859 C 21.21 37.490859 20.269062 38 19.539062 38 C 18.899062 38 18.450469 37.720937 18.230469 37.210938 C 18.100469 36.890937 18 36.409453 18 35.689453 L 18 29 z M 35.029297 29 C 36.019297 29 36.809375 29.319922 37.359375 29.919922 C 37.769375 30.359922 38 31.040469 38 31.980469 L 38 34 L 34 34 L 34 35.800781 C 34 36.260781 34.45 36.640625 35 36.640625 C 35.55 36.640625 36 36.260781 36 35.800781 L 36 35 L 38 35 C 38 35.51 37.939687 35.939609 37.929688 36.099609 C 37.859687 36.449609 37.700938 36.770781 37.460938 37.050781 C 36.920938 37.690781 36.110078 38 35.080078 38 C 34.040078 38 33.259453 37.699609 32.689453 37.099609 C 32.269453 36.669609 32 36.010078 32 35.080078 L 32 32.019531 C 32 31.079531 32.239922 30.359922 32.669922 29.919922 C 33.239922 29.319922 34.019297 29 35.029297 29 z M 35 30.449219 C 34.45 30.449219 34 30.819062 34 31.289062 L 34 32.609375 L 36 32.609375 L 36 31.289062 C 36 30.819063 35.55 30.449219 35 30.449219 z M 28.220703 30.75 C 28.065703 30.75 27.839531 30.827813 27.613281 30.945312 C 27.500156 31.004062 27.386406 31.072422 27.28125 31.146484 C 27.176094 31.220547 27.08 31.300859 27 31.380859 L 27 35.75 C 27.08 35.83 27.176094 35.904063 27.28125 35.96875 C 27.596719 36.162813 27.988203 36.279297 28.220703 36.279297 C 28.423203 36.279297 28.581836 36.22998 28.703125 36.111328 C 28.743555 36.071777 28.780625 36.024062 28.8125 35.96875 C 28.87625 35.858125 28.922187 35.714609 28.953125 35.533203 C 28.984063 35.351797 29 35.131641 29 34.869141 L 29 32.130859 C 29 31.868359 28.984063 31.649297 28.953125 31.470703 C 28.89125 31.113516 28.767187 30.913047 28.570312 30.818359 C 28.471875 30.771016 28.355703 30.75 28.220703 30.75 z"></path>
</svg>
            </a>
            
          </section>
          <section className="translate-icon" ref={toggleRef}>
            <div>
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
                  <div>
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
                    <button
                      onClick={() => switchLanguage("en")}
                      className="lang-text"
                    >
                      EN
                    </button>{" "}
                    <span>/</span>
                    <button
                      onClick={() => switchLanguage("ka")}
                      className="lang-text"
                    >
                      GE
                    </button>
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
