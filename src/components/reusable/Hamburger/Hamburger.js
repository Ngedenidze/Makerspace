import React from "react";
import "./Hamburger.css";
export default function Hamburger({ onClick, open }) {
  return (
    <button
      className={`hamburger ${open ? "open" : ""}`}
      onClick={onClick}
      aria-label="Toggle menu"
    >
      <span className="bar"></span>
      <span className="bar"></span>
      <span className="bar"></span>
    </button>
  );
}
