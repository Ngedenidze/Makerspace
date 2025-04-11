import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const CommercialRenting = () => {
    const { t, i18n } = useTranslation();

  return (
    <section className="commercial-renting">
      <div className="commercial-renting-text-container">
        <h1>{t("rental_title")}</h1>
        <p>
          {t("rental_info")}
        </p>
        <Link className="special-button" to="/Rentals">{t("rental_action")} &#x2192;</Link>
      </div>

      <div className="commercial-renting-image">
        <img
          src={require("../../../../assets/space.jpg")}
          alt="Commercial Space"
        ></img>
      </div>
    </section>
  );
};

export default CommercialRenting;
