import Carousel from "./TestimonialCarousel";
import TestimonialCard from "./CardInfo/TestimonialCard";
export default function Testimonials() {
  return (
    <section className="events-soon">
      <article className="events-topbar">
        <div>
          <h1>Soon</h1>
        </div>
      </article>

      <section className="events-cards">
        <TestimonialCard
          link="https://maps.app.goo.gl/Q8dLY1YYCdHmQ98R7"
          name="Elias Creeley"
          description=" ''The food was 
               ''"
        />
        <TestimonialCard
          link="https://maps.app.goo.gl/6wsK9NUhxQR3Noeq9"
          name="Jane Aa"
          description="''Really nice diner!!!
                "
        />
        <TestimonialCard
          link="https://maps.app.goo.gl/bRWHECmX7yPn9FAp7"
          name="Isabel Kaul"
          description="''I've had 
          '"
        />
        <TestimonialCard
          link="https://maps.app.goo.gl/ucXRRwrcJz7YVn8Z6"
          name="Jennifer Evans"
          description="''This place was "
        />
      </section>

      <section className="testimonials-carousel">
        <Carousel />
      </section>
    </section>
  );
}
