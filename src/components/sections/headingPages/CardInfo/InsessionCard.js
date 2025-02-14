import { Link } from "react-router-dom";

export default function InsessionCard({ startTime, eventName,  djName, image }) {
  return (
    <>
      <article className="in-session-text">
        <h1>In Session Now</h1>
        <h2>{eventName}</h2> 
        <section className="in-session-timestamps">
            <h3>{startTime} {djName}</h3> 
        </section>
        
      </article>
      <section className="in-session-image">
        <img
          src={require(`../../../../assets/${image}`)}
          alt={`${djName} performing`}
        />
      </section>
    </>
  );
}