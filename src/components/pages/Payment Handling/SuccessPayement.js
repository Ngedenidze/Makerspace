import React from 'react';
import './SuccessPayment.css';

const SuccessPayment = () => {
  return (
    <div className="success-payment-page">
        <div className="success-payment-content">
      <h1>Payment Success</h1>
      <p>
        Thank you! Your payment is being processed. You’ll get your QR code soon via email.
      </p>
      </div>
    </div>
  );
};

export default SuccessPayment;
