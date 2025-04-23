import { Link } from "react-router-dom";
import { useTranslation, Trans } from "react-i18next";
export default function About() {
  const { t, i18n } = useTranslation();
  return (
    <article className="about-us">
      <section className="about-top-part">
        <section className="hero-text">
          <h1>Makerspace</h1>
          <br />
          <h2 className="desktop-location">{t("address_about")}</h2>

          <section className="about-subtext">
            <p>
              <Trans i18nKey="about_me_1" components={{ strong: <strong /> }} />
            </p>
            <p>
              <Trans i18nKey="about_me_2" components={{ strong: <strong /> }} />
            </p>
            <p>
              <Trans i18nKey="about_me_3" components={{ strong: <strong /> }} />
            </p>
            <p>
              <Trans i18nKey="about_me_4" components={{ strong: <strong /> }} />
            </p>
            <ul>
              <li>
                <Trans
                  i18nKey="about_me_list_1"
                  components={{ strong: <strong /> }}
                />
              </li>
              <li>
                <Trans
                  i18nKey="about_me_list_2"
                  components={{ strong: <strong /> }}
                />
              </li>
              <li>
                <Trans
                  i18nKey="about_me_list_3"
                  components={{ strong: <strong /> }}
                />
              </li>
              <li>
                <Trans
                  i18nKey="about_me_list_4"
                  components={{ strong: <strong /> }}
                />
              </li>
              <li>
                <Trans
                  i18nKey="about_me_list_5"
                  components={{ strong: <strong /> }}
                />
              </li>
              <li>
                <Trans
                  i18nKey="about_me_list_6"
                  components={{ strong: <strong /> }}
                />
              </li>
              <li>
                <Trans
                  i18nKey="about_me_list_7"
                  components={{ strong: <strong /> }}
                />
              </li>
            </ul>
            <p>
              <Trans i18nKey="about_me_5" components={{ strong: <strong /> }} />
            </p>
            <p>
              <Trans i18nKey="about_me_6" components={{ strong: <strong /> }} />
            </p>
          </section>
          <Link className="gallery-button" to="/Gallery">
            {t("about_me_action")} &#x2192;
          </Link>
        </section>

        <section className="double-image">
          <img
            src="https://myphotostorage.blob.core.windows.net/mymakerphotos/badaca7a-094f-4b02-bdc3-d742dc39f888.jpeg"
            alt="Little Lemon Ingredients"
          ></img>
        </section>
      </section>
      <section className="about-bottom-part">
        <section className="double-image">
          <img
            src={require("../../../assets/outside.jpg")}
            alt="Little Lemon Ingredients"
          ></img>
        </section>
        <section className="hero-text-2">
          {/* <section className="mobile-location">
          <h1>Location</h1>
          <p>
            Lado Gudiashvili Square
            <br />
            Tbilisi 0162
            <br />
            Georgia
          </p>
          </section> */}
          <section className="info-text">
            <h1>{t("opening_hours")}</h1>
            <br></br>
            <p className="subsection">
              {t("friday")}: 23:00 - 07:00
              <br></br>
              {t("saturday")}: 23:00 - 07:00
            </p>
          </section>
        </section>
      </section>
    </article>
  );
}
