import React from "react";

const CommercialRenting = () => {
  return (
    <section className="commercial-renting">
      <div className="commercial-renting-text-container">
        <h1>Elevate Your Event at MakerSpace</h1>
        <p>
          Unlock the potential of our dynamic two-floor venue in the heart of
          Tbilisi. Perfect for corporate functions or private celebrations, our
          space—with its dance stage, chill-out zones, and versatile bars—is
          designed to leave a lasting impression. Ready to make your event
          unforgettable?
        </p>
        <button className="special-button">Book Now &#x2192;</button>
      </div>

      <div className="commercial-renting-image">
        <img
          src={require("../../assets/space.jpg")}
          alt="Commercial Space"
        ></img>
      </div>
    </section>
  );
};

export default CommercialRenting;
