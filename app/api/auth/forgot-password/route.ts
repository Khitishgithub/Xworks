import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { sendPasswordResetEmail } from "../../../../lib/mailer"
import { getClient } from "../../../../lib/db"

export async function POST(req: Request) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json({ error: 'Email is required.' }, { status: 400 });
  }

  const client = await getClient();
  
  try {
    // Check if the user exists
    const userQuery = 'SELECT * FROM users WHERE email = $1';
    const result = await client.query(userQuery, [email]);
    const user = result.rows[0];

    if (!user) {
      return NextResponse.json({ error: 'User not found.' }, { status: 404 });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    const tokenExpiry = new Date(Date.now() + 3600000); // 1 hour

  
    const updateQuery = `
      UPDATE users
      SET reset_password_token = $1, reset_password_expires = $2
      WHERE email = $3
    `;
    await client.query(updateQuery, [hashedToken, tokenExpiry, email]);

   
    const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password?token=${resetToken}&email=${email}`;
    await sendPasswordResetEmail(email, resetUrl);

    return NextResponse.json({ message: 'Password reset link sent.' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to send reset link.' }, { status: 500 });
  } finally {
    client.release();
  }
}
