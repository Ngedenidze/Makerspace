import Carousel from "./SpecialsCarousel";
import GreekSalad from "../../../assets/food/greek-salad.webp";
import LemonDessert from "../../../assets/food/lemon-dessert.webp";
import Test from "../../../assets/food/test.jpg";
import CroqueMadame from "../../../assets/food/croque-madame.jpg";
import SpecialCard from "./CardInfo/SpecialCard";
import AvocadoToast from "../../../assets/food/avocado-toast.jpg";
import RedWhiteBlue from "../../../assets/food/red-white-blue.jpg";
import SweetFrench from "../../../assets/food/sweet-french.webp";
import BreakfastCroissant from "../../../assets/food/breakfast-croissant.jpg";
import BreakfastBurrito from "../../../assets/food/breakfast-burrito.jpg";

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
