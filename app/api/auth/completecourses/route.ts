
// app/api/auth/completecourses/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getClient } from '../../../../lib/db';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../[...nextauth]/route';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    console.log('Received GET request');

    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      console.log('Unauthorized request - No session found');
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const userId = session.user.id;

    console.log('Session found:', session);

    const client = await getClient();
    const result = await client.query(
      `SELECT c.course_id, c.course_name, c.course_code, c.description, c.duration_hours, c.price, c.category_id, 
              c.level, c.created_at, c.updated_at, c.status
       FROM courses c
       JOIN user_courses uc ON uc.course_id = c.course_id
       WHERE uc.user_id = $1 AND uc.status = 'Completed'`,
      [userId]
    );

    console.log('Courses fetched:', result.rows);

    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Error fetching completed courses:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
