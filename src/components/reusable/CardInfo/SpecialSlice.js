import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
export default function SpecialSlice(props) {
  const { t } = useTranslation();

  return (
    <Link to={props.link} className="menu-card-link">
      <article className="menu-card">
        <section className="menu-card-content">
          <time className="weekday">{props.weekday}</time>
          <h4>{props.eventName}</h4>
          <div>
            {props.stages &&
              props.stages.map(([floor, names]) => {
                const stageLabel =
                  parseInt(floor, 10) === 1
                    ? t("main_stage")
                    : parseInt(floor, 10) === 2
                    ? t("space_stage")
                    : `${floor}`;
                return (<>
                   <p key={floor}>
                    {stageLabel} {t("stage")}
                  </p>
                  <h3>
                     {names.join(", ")}
                  </h3>
                  </>
               
                );
              })}
          </div>
        </section>
      </article>
    </Link>
  );
}
