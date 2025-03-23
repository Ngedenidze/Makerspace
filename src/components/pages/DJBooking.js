import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const DJBooking = () => {
    const { t, i18n } = useTranslation();
  return (
    <section className="dj-booking">
    <div className="dj-booking-image">
        <img
          src="https://myphotostorage.blob.core.windows.net/mymakerphotos/969ab696-226c-4b4f-8385-2d683e868612.jpeg"
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
