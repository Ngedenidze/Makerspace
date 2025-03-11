export default function About() {
  return (
    <article className="about-us">
      <section className="about-top-part">
        <section className="hero-text">
          <h1>Makerspace</h1>
          <br />
          <h2 className="desktop-location">
            Lado Gudiashvili Square
            <br />
            Tbilisi 0162
            <br />
            Georgia
          </h2>
          <p className="about-subtext">
            Makerspace is a uniquely designed bar located in the heart of
            Tbilisi, offering an exciting blend of electronic music and a
            welcoming atmosphere. Join us on Fridays and Saturdays for
            unforgettable nights, where our professional DJs and friendly staff
            ensure you have an incredible experience. Makerspace is more than
            just a bar—it’s a community open to new friendships and meaningful
            connections. During the week, our versatile 400m² venue is available
            for private and corporate events. With dedicated areas including a
            dancing stage, chill-out rooms, a cocktail bar, and an open yard
            bar, it’s the perfect space for any celebration. We’re always ready
            to welcome you!
          </p>
        </section>

        <section className="double-image">
          <img
            src={require("../../../assets/inside.jpg")}
            alt="Little Lemon Ingredients"
          ></img>
        </section>
      </section>
      <section className="about-botton-part">
        <section className="double-image">
          <img
            src={require("../../../assets/outside.jpg")}
            alt="Little Lemon Ingredients"
          ></img>
        </section>
        <section className="hero-text-2">
        {/* <section className="mobile-location">
          <h1>Location</h1>
          <p>
            Lado Gudiashvili Square
            <br />
            Tbilisi 0162
            <br />
            Georgia
          </p>
          </section> */}
          <section className="info-text">
            <h1>Opening Hours</h1>
            <br></br>
            <p className="subsection">
              Friday: 11 PM - 12:00 AM
              <br></br>
              Saturday: 12:00 AM - 7:00 AM / 11PM - 12:00 AM
              <br></br>
              Sunday: 12:00 AM - 7:00 AM
            </p>
          </section>
         
        </section>
      </section>
    </article>
  );
}
