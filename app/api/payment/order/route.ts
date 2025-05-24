import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';

export async function POST(req: Request) {
  try {
    const { amount, currency } = await req.json();

    if (!amount || !currency) {
      return NextResponse.json({ error: 'Amount and currency are required.' }, { status: 400 });
    }

    // Check if the environment variables are set
    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
      return NextResponse.json({ error: 'Razorpay key ID or key secret is missing.' }, { status: 500 });
    }

    // Initialize Razorpay instance
    const razorpay = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });

    // Create an order
    const options = {
      amount: amount * 100, // Convert to smallest currency unit
      currency: currency,
      receipt: 'receipt#1',  // You can customize this as per your requirement
    };

    const order = await razorpay.orders.create(options);

    return NextResponse.json({ order });
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    return NextResponse.json({ error: 'Error creating order' }, { status: 500 });
  }
}
