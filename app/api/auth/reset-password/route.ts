import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { getClient } from '@/lib/db';

export async function POST(req: Request) {
  const { token, email, password } = await req.json();

  const client = await getClient();
  
  try {
   
    const userQuery = 'SELECT * FROM users WHERE email = $1';
    const result = await client.query(userQuery, [email]);
    const user = result.rows[0];

    if (!user) {
      return NextResponse.json({ error: 'User not found.' }, { status: 404 });
    }

  
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
    if (user.reset_password_token !== hashedToken || user.reset_password_expires < new Date()) {
      return NextResponse.json({ error: 'Invalid or expired token.' }, { status: 400 });
    }

   
    const updateQuery = `
      UPDATE users 
      SET password = $1, reset_password_token = NULL, reset_password_expires = NULL 
      WHERE email = $2
    `;
    await client.query(updateQuery, [password, email]);

    return NextResponse.json({ message: 'Password reset successful.' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to reset password.' }, { status: 500 });
  } finally {
    client.release();
  }
}
