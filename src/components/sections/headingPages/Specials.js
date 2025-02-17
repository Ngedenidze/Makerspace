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
          weekday="Saturday"
          date="01.02.2025"
          djName="ROOTRHYME + BEQA"
          link="/event-details"
        />
        <SpecialCard
          weekday="Friday"
          date="07.02.2025"
          djName="LEVI LOVE DISCO"
          link="/event-details"
        />
        <SpecialCard
          weekday="Saturday"
          date="08.02.2025"
          djName="RASHIO"
          link="/event-details"
        />
        <SpecialCard
          weekday="Friday"
          date="14.02.2025"
          djName="ELENE + KASHIA"
          link="/event-details"
        />
      </section>

      <section className="specials-carousel">
        <Carousel />
      </section>
    </section>
  );
}
