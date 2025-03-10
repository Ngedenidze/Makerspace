import { Link } from "react-router-dom";
export default function SpecialSlice(props) {
    return (
      <Link to={props.link} className="menu-card-link">
        <article className="menu-card">
          <section className="menu-card-content">
            <time className="weekday">{props.weekday}</time> 
            <time className="date">{props.eventName}</time> 
            <h4><strong>Lineup:</strong> {props.djName}</h4> 
            <Link to={props.link} className="special-button" rel="noopener noreferrer">
              View
            </Link>
          </section>
        </article>
      </Link>
    );
  }
  