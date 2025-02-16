import Carousel from "./SpecialsCarousel";
import SpecialCard from "./CardInfo/SpecialCard";

export default function Specials() {
  return (
    <section className="events-up-next">
      <article className="events-topbar">
        <div>
          <h1>Next Up</h1>
        </div>
      </article>

      <section className="events-cards">
      <SpecialCard 
  weekday="Week day" 
  date="13.02.2025" 
  djName="DJ Name" 
  link="/event-details"
/>
<SpecialCard 
  weekday="Week day" 
  date="13.02.2025" 
  djName="DJ Name" 
  link="/event-details"
/>
<SpecialCard 
  weekday="Week day" 
  date="13.02.2025" 
  djName="DJ Name" 
  link="/event-details"
/>
<SpecialCard 
  weekday="Week day" 
  date="13.02.2025" 
  djName="DJ Name" 
  link="/event-details"
/>
      </section>

      <section className="specials-carousel">
        <Carousel />
      </section>
    </section>
  );
}
