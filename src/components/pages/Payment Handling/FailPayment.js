import React from 'react';
import { Link } from 'react-router-dom';
import './FailPayment.css';

const FailPayment = () => {
  return (
    <div className="fail-payment-page">
      <div className="fail-payment-card">
        <div className="fail-icon">
          {/* SVG “X” icon to indicate failure */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="72"
            height="72"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#fff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </div>
        <h1 className="fail-heading">Payment Failed</h1>
        <p className="fail-text">
          It looks like your payment was unsuccessful or canceled. Please try again or
          browse other events.
        </p>
        <Link to="/AllEvents" className="fail-button">
          Browse Events
        </Link>
      </div>
    </div>
  );
};

export default FailPayment;
