import { NextResponse } from 'next/server';
import { getClient } from '../../../../../../lib/db';

export async function GET(req: Request, { params }: { params: { corporateId: string } }) {
  try {
    const client = await getClient();
    const { corporateId } = params;

    
    const result = await client.query(`
      SELECT department_id, department_name 
      FROM Departments 
      WHERE corporate_id = $1
    `, [corporateId]);

    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Error fetching departments:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
