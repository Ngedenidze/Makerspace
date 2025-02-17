import Carousel from "./SpecialsCarousel";
import SpecialCard from "./CardInfo/SpecialCard";
export default function Testimonials() {
  return (
    <section className="events-soon">
      <article className="events-topbar">
        <div>
          <h1>Soon</h1>
        </div>
      </article>

      <section className="events-cards">
<SpecialCard 
  weekday="Friday" 
  date="21.02.2025" 
  djName="MARK CHEZ" 
  link="/event-details"
/><SpecialCard 
  weekday="Saturday" 
  date="22.02.2025" 
  djName="DJ Name" 
  link="/event-details"
/><SpecialCard 
  weekday="Friday" 
  date="28.02.2025" 
  djName="GIO SHENGELIA B2B TOMA" 
  link="/event-details"
/><SpecialCard 
  weekday="Saturday" 
  date="29.02.2025" 
  djName="BEBUR" 
  link="/event-details"
/>
      </section>

      <section className="testimonials-carousel">
        <Carousel />
      </section>
    </section>
  );
}
