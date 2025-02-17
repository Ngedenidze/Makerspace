import { Link } from "react-router-dom";
import InsessionCard from "./CardInfo/InsessionCard";
import InsessionTabs from "./CardInfo/InsessionTabs";

export default function Insession() {
  return (
    <section className="in-session-box">
     <InsessionTabs />
    </section>
  );
}