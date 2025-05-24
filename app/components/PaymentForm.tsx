import React, { useState } from 'react';
import { Card, CardContent, CardActions, CardHeader, Typography, TextField, Button, Box, Avatar } from '@mui/material';

// Define the prop types
interface PaymentFormProps {
  onClose?: () => void;  // Optional prop for handling close action
  onPaymentSuccess: (response: any, formData: any) => void; // Callback when payment succeeds
}

// Define the Razorpay response type (customize as per Razorpay documentation)
interface RazorpayResponse {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ onClose, onPaymentSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Request to create Razorpay order on your backend
      const res = await fetch('/api/payment/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: 5900, currency: 'INR' }),
      });

      const data = await res.json();

      if (!data.order) {
        throw new Error('Order creation failed');
      }

      const { order } = data;

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Make sure this key is set in your environment
        amount: order.amount,
        currency: order.currency,
        name: 'Workshop Registration',
        description: 'Registration fee for the workshop',
        order_id: order.id,
        handler: async function (response: RazorpayResponse) {
          const paymentData = {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          };

          // Verify payment on your server
          const verifyRes = await fetch('/api/payment/verify', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(paymentData),
          });

          const verifyData = await verifyRes.json();
          if (verifyData.error) {
            console.error('Payment verification failed', verifyData.error);
          } else {
            onPaymentSuccess(response, formData);
          }
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone,
        },
        theme: {
          color: '#4169E1',
        },
      };

      // Razorpay instance initialization
      const paymentObject = new (window as any).Razorpay(options);  // Declaring Razorpay manually as any
      paymentObject.open();
    } catch (error) {
      console.error('Error initiating payment:', error);
    }
  };

  return (
    <Card
      sx={{
        maxWidth: 900,
        mx: 'auto',
        mt: 4,
        p: 2,
        boxShadow: 3,
        borderRadius: 3,
        bgcolor: '#f9f9f9',
      }}
    >
      <CardHeader
        avatar={
          <Avatar src="/XWORKS.png" alt="Logo" sx={{ width: 76, height: 76 }} />
        }
        title={
          <Typography variant="h5" component="h2" sx={{ color: '#0047AB', fontWeight: 'bold' }}>
            Payment Details
          </Typography>
        }
      />
      <CardContent>
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <TextField
              fullWidth
              id="name"
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              variant="outlined"
              sx={{ bgcolor: '#fff', borderRadius: 2 }}
            />
            <TextField
              fullWidth
              id="email"
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              variant="outlined"
              sx={{ bgcolor: '#fff', borderRadius: 2 }}
            />
            <TextField
              fullWidth
              id="phone"
              label="Phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              required
              variant="outlined"
              sx={{ bgcolor: '#fff', borderRadius: 2 }}
            />
            <TextField
              fullWidth
              id="amount"
              label="Amount"
              name="amount"
              value="₹ 5,900.00"
              InputProps={{ readOnly: true }}
              variant="outlined"
              sx={{ bgcolor: '#fff', borderRadius: 2 }}
            />
          </Box>
        </form>
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end', mt: 2 }}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          sx={{
            backgroundColor: '#4169E1',
            '&:hover': {
              backgroundColor: '#315bb5',
            },
            fontWeight: 'bold',
            px: 4,
            py: 1,
            borderRadius: 2,
          }}
        >
          Pay ₹ 5,900.00
        </Button>
      </CardActions>
    </Card>
  );
};

export default PaymentForm;
