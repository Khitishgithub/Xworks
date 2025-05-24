import { NextRequest, NextResponse } from "next/server";
import { getClient } from "@/lib/db";
import { sendVerificationEmail } from "../../../services/emailService";

export async function POST(req: NextRequest) {
  let client;
  try {
    const { email } = await req.json();
    client = await getClient();

    // Generate a random 6-digit code
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Store the code in the database with expiration
    const query = `
      INSERT INTO verification_codes (email, code, expires_at)
      VALUES ($1, $2, NOW() + INTERVAL '10 minutes')
    `;
    await client.query(query, [email, verificationCode]);

    // Send the verification email
    await sendVerificationEmail(email, verificationCode);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending verification:", error);
    return NextResponse.json({ error: "Failed to send verification code" }, { status: 500 });
  } finally {
    if (client) client.release();
  }
}