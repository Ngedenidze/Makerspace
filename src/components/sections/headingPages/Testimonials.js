import Carousel from "./TestimonialCarousel";
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
  weekday="Week day" 
  date="13.02.2025" 
  djName="DJ Name" 
  link="/event-details"
/><SpecialCard 
  weekday="Week day" 
  date="13.02.2025" 
  djName="DJ Name" 
  link="/event-details"
/><SpecialCard 
  weekday="Week day" 
  date="13.02.2025" 
  djName="DJ Name" 
  link="/event-details"
/><SpecialCard 
  weekday="Week day" 
  date="13.02.2025" 
  djName="DJ Name" 
  link="/event-details"
/>
      </section>

      <section className="testimonials-carousel">
        <Carousel />
      </section>
    </section>
  );
}
