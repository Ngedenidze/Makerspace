import React from 'react';
import './FailPayment.css';

const FailPayment = () => {
  return (
    <div className="fail-payment-page">
        <div className="fail-payment-content">
      <h1>Payment Failed</h1>
      <p>
        Payment failed or canceled. You can try again from your tickets page.
      </p>
      </div>
    </div>
  );
};

export default FailPayment;