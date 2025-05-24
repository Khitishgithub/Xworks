// app/Payment.tsx or pages/Payment.tsx
"use client";

import { useEffect } from "react";

const Page = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePayment = async () => {
    // Replace with your actual order creation logic
    const order = await createRazorpayOrder();

    const options = {
      key: 'YOUR_RAZORPAY_KEY_ID', // Replace with your actual Razorpay key
      amount: order.amount,
      currency: order.currency,
      name: 'Workshop Registration',
      description: 'Registration fee for the workshop',
      order_id: order.id,
      handler: function (response: any) {
        alert('Payment Successful! Payment ID: ' + response.razorpay_payment_id);
        // Handle successful payment (e.g., update database, show confirmation)
      },
      prefill: {
        name: 'John Doe',
        email: 'john@example.com',
        contact: '+919876543210',
      },
      theme: {
        color: '#FF6B4E',
      },
    };

    const paymentObject = new (window as any).Razorpay(options);
    paymentObject.open();
  };

  // Mock function to create a Razorpay order
  const createRazorpayOrder = async () => {
    // In a real application, this would be an API call to your backend
    return {
      id: 'order_' + Math.random().toString(36).substr(2, 9),
      amount: 1, // Amount in paise (e.g., 1000 paise = ₹10)
      currency: 'INR',
    };
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-[#FF6B4E] mb-6">Payment</h1>
      <button
        onClick={handlePayment}
        className="w-full bg-[#6AD399] text-white py-4 rounded-md hover:bg-opacity-90 transition-opacity"
      >
        Pay Now
      </button>
    </div>
  );
};

export default Page;
