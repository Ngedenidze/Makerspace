import React from 'react';
import { Link } from 'react-router-dom';
import './SuccessPayment.css';

const SuccessPayment = () => {
  return (
    <div className="success-payment-page">
      <div className="success-payment-card">
        <div className="success-icon">
          {/* SVG Checkmark */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="72"
            height="72"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>
        <h1 className="success-heading">Payment Successful!</h1>
        <p className="success-text">
          Thank you for your purchase. Your payment is being processed, and we’ll send your QR code to your email shortly.
        </p>
        <Link to="/profile" className="success-button">
          Go to My Tickets
        </Link>
      </div>
    </div>
  );
};

export default SuccessPayment;
