import { Link } from "react-router-dom";
export default function SpecialSlice(props) {
    return (
      <Link to={props.link} className="menu-card-link">
        <article className="menu-card">
          <section className="menu-card-content">
            <h2>{props.weekday}</h2> 
            <h3>{props.eventName}</h3> 
            <p><strong>Lineup:</strong> {props.djName}</p> 
            <Link to={props.link} className="special-button" rel="noopener noreferrer">
              View
            </Link>
          </section>
        </article>
      </Link>
    );
  }
  