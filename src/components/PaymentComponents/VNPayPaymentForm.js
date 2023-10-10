import React, { useState } from 'react';

const VNPayPaymentForm = () => {
  const [amount, setAmount] = useState(100); // Example amount in VND (100 VND)
  const [orderId, setOrderId] = useState('123456789'); // Example order ID
  const vnpUrl = 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html';

  const handlePayment = () => {
    // VNPay parameters
    const vnpParams = {
      vnp_Amount: amount * 100, // Amount in VND (convert to cents)
      vnp_Command: 'pay',
      vnp_CreateDate: new Date().toISOString(),
      vnp_CurrCode: 'VND',
      vnp_Locale: 'vn',
      vnp_OrderInfo: 'Payment for order ' + orderId,
      vnp_OrderType: 'other',
      vnp_ReturnUrl: 'http://localhost:3000/return', // Replace with your return URL
      vnp_TmnCode: '2QXUI4J4', // Replace with your merchant code
      vnp_TxnRef: orderId,
      vnp_Version: '2.0.0',
    };

    // Construct VNPay URL
    const vnpUrlWithParams = vnpUrl + '?' + new URLSearchParams(vnpParams).toString();

    // Redirect to VNPay payment page
    window.location.href = vnpUrlWithParams;
  };

  return (
    <div>
      <h2>VNPay Payment</h2>
      <div>
        <label>Amount (VND):</label>
        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
      </div>
      <div>
        <label>Order ID:</label>
        <input type="text" value={orderId} onChange={(e) => setOrderId(e.target.value)} />
      </div>
      <button onClick={handlePayment}>Pay with VNPay</button>
    </div>
  );
};

export default VNPayPaymentForm;