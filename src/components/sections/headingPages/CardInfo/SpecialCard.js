import { Link } from "react-router-dom";

export default function SpecialCard(props) {
  return (
    <Link to={props.link} className="menu-card-link">
    <article className="menu-card">
      <section className="menu-card-content">
        <h2>{props.weekday}</h2> 
        <h2>{props.date}</h2> 
        <p>{props.djName}</p> 
        <Link to={props.link} className="special-button" rel="noopener noreferrer">
          View
        </Link>
       
      </section>
    </article>
  </Link>
  );
}