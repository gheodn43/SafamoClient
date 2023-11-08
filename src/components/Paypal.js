import { PayPalButtons } from '@paypal/react-paypal-js';
import React from 'react';

const PayPalPayment = () => {
  const createOrder = (data, actions) => {
    return fetch("/my-server/create-paypal-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        product: {
          description: "FPT",
          cost: "1.0Đ"
        }
      }),
    })
    .then((response) => response.json())
    .then((order) => order.id);
  };

  const onApprove = (data, actions) => {
    return fetch("/my-server/capture-paypal-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderID: data.orderID
      }),
    })
    .then(async (response) => {
      console.log("Payment successfully", await response.json());
      return response.json();
    });
  };

  return (
    <PayPalButtons
      createOrder={(data, actions) => createOrder(data, actions)}
      onApprove={(data, actions) => onApprove(data, actions)}
    />
  );
};

export default PayPalPayment;
