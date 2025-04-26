import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import djBookingImg from "./../../../assets/dj_booking.jpeg";

const DJBooking = () => {
    const { t, i18n } = useTranslation();
  return (
    <section className="dj-booking">
    <div className="dj-booking-image">
        <img
          src={djBookingImg}
          alt="DJ Stage"
        ></img>
      </div>
      <div className="dj-booking-text-container">
        <h1> {t("dj_booking_title")}</h1>
        <p>
          {t("dj_booking_info")} </p>
        <Link className="special-button" to="/DJs">{t("dj_booking_action")} &#x2192;</Link>
      </div>

   
    </section>
  );
};

export default DJBooking;
