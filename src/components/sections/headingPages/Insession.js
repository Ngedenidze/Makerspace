import { Link } from "react-router-dom";
import InsessionCard from "./CardInfo/InsessionCard";

export default function InSession() {
  return (
    <section className="in-session-box">
      <InsessionCard
        startTime="4:00"
        eventName="Event Name"
        djName="DJ Name"
        image="art-cover.jpg"
      />
    </section>
  );
}