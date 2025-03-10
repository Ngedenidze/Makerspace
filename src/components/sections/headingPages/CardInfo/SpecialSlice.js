import { Link } from "react-router-dom";

export default function SpecialSlice(props) {
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
                    ? "Main"
                    : parseInt(floor, 10) === 2
                    ? "Space"
                    : `Stage ${floor}`;
                return (<>
                   <p key={floor}>
                    {stageLabel} Stage:
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
