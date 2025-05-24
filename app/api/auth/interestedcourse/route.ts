
// app/api/auth/interestedcourse/route.ts
import { NextResponse } from "next/server";
import { getClient } from "../../../../lib/db"; 
import { getServerSession } from 'next-auth/next';
import { authOptions } from "../[...nextauth]/route"; 

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const client = await getClient();

  try {
    const result = await client.query(
      `
      SELECT c.course_id, c.course_name, c.description, c.duration_hours, c.level, uc.status
      FROM user_courses uc
      JOIN courses c ON uc.course_id = c.course_id
      WHERE uc.user_id = $1 AND (uc.status = 'In Progress' OR uc.status = 'Enrolled')
    `,
      [session.user?.id]
    );

    return NextResponse.json(result.rows);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  } finally {
    client.release();
  }
}
