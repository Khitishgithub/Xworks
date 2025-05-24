import { NextRequest, NextResponse } from "next/server";
import { getClient } from "../../../../lib/db";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../[...nextauth]/route";

export async function POST(request: NextRequest) {
  try {
    console.log("Received POST request for Workshop creation");

    // Check session for authentication
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Get workshop data from the request body
    const {
      workshop_name,
      topic,
      duration,
      cost,
      start_date,
      schedule,
      is_weekend_only,
      what_you_will_learn,
      why_attend,
      about_workshop,
      who_should_attend,
      prerequisites,
      main_heading,
    } = await request.json();

    const client = await getClient();

    // Insert the new workshop into the database
    const result = await client.query(
      `
      INSERT INTO workshops (
        workshop_name,
        topic,
        duration,
        cost,
        start_date,
        schedule,
        is_weekend_only,
        what_you_will_learn,
        why_attend,
        about_workshop,
        who_should_attend,
        prerequisites,
        main_heading
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
      RETURNING id
    `,
      [
        workshop_name,
        topic,
        duration,
        cost,
        start_date,
        schedule,
        is_weekend_only,
        JSON.stringify(what_you_will_learn),
        JSON.stringify(why_attend),
        JSON.stringify(about_workshop),
        JSON.stringify(who_should_attend),
        JSON.stringify(prerequisites),
        JSON.stringify(main_heading),
      ]
    );

    console.log("Workshop created:", result.rows[0]);

    return NextResponse.json(
      { workshop_id: result.rows[0].id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating workshop:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const client = await getClient();

    const result = await client.query(`
      SELECT 
        id,
        workshop_name AS name,
        topic,
        duration,
        cost,
        start_date AS "startingOn",
        schedule AS "timing",
         what_you_will_learn::text AS what_you_will_learn,
        why_attend::text AS why_attend,
        about_workshop::text AS about_workshop,
        who_should_attend::text AS who_should_attend,
        prerequisites::text AS prerequisites,
        main_heading::text main_heading
      FROM workshops
      ORDER BY id DESC
    `);

    return NextResponse.json(result.rows, { status: 200 });
  } catch (error) {
    console.error("Error fetching workshops:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
