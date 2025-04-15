import React from "react";
import "./TermsAndConditions.css";

const TermsAndConditions = () => {
  return (
    <div className="terms-and-conditions-page">
      <div className="terms-header">
        <h1>Terms and Conditions</h1>
      </div>
      <div className="terms-content">
        <section>
          <h2>Rules</h2>
          <p>
          Club Makerspace is dedicated to providing a welcoming environment for freedom, creativity, and music—a place where every guest feels safe and respected. We expect all individuals to engage respectfully, regardless of gender, sexual orientation, ethnicity, age, or any other personal characteristic. Harassment, discrimination, or any form of aggressive or abusive behavior will not be tolerated. Any person found to be engaging in homophobic, sexist, discriminatory, or otherwise unacceptable conduct may be asked to leave the premises immediately.
          </p>
        </section>
        <section>
          <h2>Privacy Policy</h2>
          <p>
          At Club Makerspace, your privacy is of utmost importance. We collect personal information—such as your phone number, email address, and tax identification number—only when necessary for event registration or official communications. This data is stored securely and is used solely for internal purposes related to event management and customer support. We do not share your personal information with third parties, except as required by law or as necessary to protect our rights and safety. </p>
        </section>
      </div>
    </div>
  );
};

export default TermsAndConditions;