'use client';

import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
 
const CheckoutPage = () => {
  const initialOptions = {
    "client-id": "ARJj_zXhkrI-dtEVkFqKAaz0SVmr8BdcXfv-TGCE5NooD-oP8bjMDB0S5I3D9DfrIVB71lRrrsznCXGZ",
    currency: "USD",
    intent: "capture",
  };

  const handleApprove = (orderId) => {
    alert(`Payment completed successfully! Order ID: ${orderId}`);
  };

  const handleError = (error) => {
    console.error("PayPal Checkout Error:", error);
    alert("There was an issue with your payment. Please try again.");
  };

  return (
    <div style={checkoutPageStyles}>
      {/* Navbar */}
      <div style={navbarStyles}>
        <h1 style={logoStyles}>Checkout</h1>
      </div>

      <div style={checkoutContainerStyles}>
        <h2>Complete Your Payment</h2>
        <p>Thank you for shopping! Please click the button below to pay with PayPal.</p>

        {/* PayPal Button */}
        <PayPalScriptProvider options={initialOptions}>
          <PayPalButtons
            style={{ layout: "vertical" }}
            createOrder={(data, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      value: "2000.00", // Replace with dynamic cart total
                    },
                  },
                ],
              });
            }}
            onApprove={(data, actions) => {
              return actions.order.capture().then(( ) => {
                handleApprove(data.orderID);
              });
            }}
            onError={(err) => handleError(err)}
          />
        </PayPalScriptProvider>
      </div>
    </div>
  );
};

// Styles
const checkoutPageStyles = {
  padding: '20px',
  fontFamily: 'Arial, sans-serif',
  backgroundColor: '#F9F9F9',
  minHeight: '100vh',
};

const navbarStyles = {
  backgroundColor: '#333',
  color: '#FFF',
  padding: '10px 20px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const logoStyles = {
  fontSize: '24px',
  fontWeight: 'bold',
};

const checkoutContainerStyles = {
  margin: '30px auto',
  padding: '20px',
  maxWidth: '500px',
  backgroundColor: '#000000',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  textAlign: 'center',
};

export default CheckoutPage;
