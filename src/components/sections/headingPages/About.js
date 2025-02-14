export default function About() {
    return (
        <article className="about-us">
            <section className="hero-text">
                <h1>Oasis Diner</h1>
                <h2>Butler, NJ</h2>
                <p className="about-subtext">Experience a blend of global flavors at our family-centric American diner.
                 Oasis Diner combines the charm of local dining with a diverse menu that features specialties from around the world.
                Alongside our heartwarming selections, enjoy our rich, espresso-based coffees in a cozy and inviting atmosphere.
                 Join us at Oasis Diner and savor the taste of culinary diversity.</p>
            </section>

            <section className="double-image">
            <img className="about-2" src={require('../../../assets/interior2.jpg')} alt="Oasis Diner Interior"></img>
               
            </section>
            <section className="double-image">
                <img className="about-1" src={require('../../../assets/interior.jpg')} alt="Oasis Diner Interior"></img>
               
            </section>
            <section className="hero-text-2">
              <h1>Opening Hours</h1>
              <br></br>
              <p className="subsection">
                Monday: 7:00 AM - 9:00 PM
                <br></br>
                Tuesday: 7:00 AM - 9:00 PM
                <br></br>
                Wednesday: 7:00 AM - 9:00 PM
                <br></br>
                Thursday: 7:00 AM - 9:00 PM
                <br></br>
                Friday: 7:00 AM - 10:00 PM
                <br></br>
                Saturday: 7:00 AM - 10:00 PM
                <br></br>
                Sunday: 7:00 AM - 9:00 PM
              </p>
            </section>
    </article>
    );
}