import { NextRequest, NextResponse } from "next/server";
import { getClient } from "../../../../lib/db";

export async function POST(req: NextRequest) {
  let client;
  try {
    const { email, code } = await req.json();
    client = await getClient();

    // Check if the code is valid and not expired
    const query = `
      SELECT * FROM verification_codes
      WHERE email = $1 AND code = $2 AND expires_at > NOW()
      ORDER BY created_at DESC LIMIT 1
    `;
    const result = await client.query(query, [email, code]);

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Invalid or expired code" }, { status: 400 });
    }

    // Delete the used code
    await client.query('DELETE FROM verification_codes WHERE email = $1 AND code = $2', [email, code]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error verifying code:", error);
    return NextResponse.json({ error: "Failed to verify code" }, { status: 500 });
  } finally {
    if (client) client.release();
  }
}