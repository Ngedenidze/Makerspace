import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';

export default function Navigation({ device, onSpecialsClick, onAboutClick }) {
  const { t } = useTranslation();

  return (
    <section className="navbar-stack">
      <div className="nav-bar-title">
        {/* Optionally, add a translated title if needed */}
      </div>
      {device === "mobile" ? (
        ""
      ) : (
        <div className="nav-bar-logo">
          <img
            src={require("../assets/ms-name-red.png")}
            alt={t('makerspace_logo')}
            className="nav-title-logo"
          />
          <Link to="/">
            <img
              src={"https://myphotostorage.blob.core.windows.net/mymakerphotos/7d69a115-b47f-4803-a627-485f86ef5c95.jpg"}
              alt={t('little_lemon_logo')}
              className="nav-image"
            />
          </Link>
        </div>
      )}
      <menu className={`navbar-menu ${device}`}>
        <Link className="hover-effect" to="/AllEvents">
          <h1>{t('events')}</h1>
        </Link>
        <Link className="hover-effect" to="/Rentals">
          <h1>{t('rentals')}</h1>
        </Link>
        <section className="desktop-menu">
          <Link className="hover-effect" to="/Djs">
            <h1>{t('djs')}</h1>
          </Link>
          <Link className="hover-effect" to="/gallery">
            <h1>{t('gallery')}</h1>
          </Link>
        </section>
      </menu>
    </section>
  );
}
