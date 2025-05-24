import { NextRequest, NextResponse } from 'next/server';
import { getClient } from '../../../../lib/db';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../[...nextauth]/route';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const client = await getClient();
    const { rows } = await client.query(`
      SELECT department_id as id, department_name as name
      FROM Departments
      ORDER BY department_name
    `);

    return NextResponse.json(rows);
  } catch (error) {
    console.error('Error fetching departments:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
