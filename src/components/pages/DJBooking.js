import React from "react";
import { Link } from "react-router-dom";

const DJBooking = () => {
  return (
    <section className="dj-booking">
    <div className="dj-booking-image">
        <img
          src={require("../../assets/DJs/dj-stage.jpg")}
          alt="DJ Stage"
        ></img>
      </div>
      <div className="dj-booking-text-container">
        <h1>Take the Stage at Makerspace</h1>
        <p>
          Are you ready to showcase your talent at one of the most dynamic venues in Tbilisi? Whether you're an emerging artist or a seasoned DJ, our space—with its immersive sound system, energetic dance floor, and vibrant crowd—is the perfect platform to make your mark. Ready to electrify the night?
        </p>
        <Link className="special-button" to="/DJs">Get Started &#x2192;</Link>
      </div>

   
    </section>
  );
};

export default DJBooking;
