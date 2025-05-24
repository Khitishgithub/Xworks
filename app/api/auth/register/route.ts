//api/auth/register/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getClient } from "../../../../lib/db"; 

export async function POST(req: NextRequest) {
  let client;
  try {
    const body = await req.json();
    const { username, name, email, password } = body;

    // Validate required fields
    if (!username || !name || !email || !password) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    // Get database client
    client = await getClient();

    // Check if user already exists
    const checkUserQuery = 'SELECT * FROM users WHERE email = $1';
    const result = await client.query(checkUserQuery, [email]);
    const existingUser = result.rows[0];

    // If user already exists, return an error
    if (existingUser) {
      return NextResponse.json({ error: "User with this email already exists" }, { status: 400 });
    }

    // Insert new user into the database
    const insertUserQuery = `
      INSERT INTO users (username, name, email, password, user_type_id, is_active) 
      VALUES ($1, $2, $3, $4, $5, $6)
    `;
    await client.query(insertUserQuery, [username, name, email, password, 1, true]);

    // Success response
    return NextResponse.json({ success: "User created successfully" }, { status: 200 });

  } catch (error) {
    // Type narrowing to handle the 'unknown' error type
    if (error instanceof Error) {
      console.error("Error occurred during user registration:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      console.error("Unknown error occurred during user registration:", error);
      return NextResponse.json({ error: "Unknown error occurred" }, { status: 500 });
    }
  } finally {
    // Release database client
    if (client) client.release();
  }
}
