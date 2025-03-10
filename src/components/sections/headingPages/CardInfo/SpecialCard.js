import { Link } from "react-router-dom";

export default function SpecialCard(props) {
  return (
    <Link to={props.link} className="menu-card-link">
    <article className="menu-card">
      <section className="menu-card-content">
        <time className="weekday">{props.weekday}</time> 
        <time className="date">{props.date}</time> 
        <h4>{props.djName}</h4> 
      </section>
    </article>
  </Link>
  );
}