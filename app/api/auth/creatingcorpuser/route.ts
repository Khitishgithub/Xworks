import { NextRequest, NextResponse } from 'next/server';
import { getClient } from '../../../../lib/db';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]/route';


export async function GET() {
  try {
    const client = await getClient();
    
   
    const result = await client.query(
     ` SELECT corporate_id, corporate_name 
      FROM CorporateMaster`
    );

    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Error fetching corporates:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}


export async function POST(request: NextRequest) {
  try {
    console.log('Received POST request to create corpUser');

   
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

   
    const { corp_id_id, dept_id, username, name, email, password } = await request.json();

    
    const client = await getClient();


    const result = await client.query(
      `
      INSERT INTO corpUser (corp_id_id, dept_id, username, name, email, password, user_type_id) 
      VALUES ($1, $2, $3, $4, $5, $6, $7) 
      RETURNING id
      `,
      [corp_id_id, dept_id, username, name, email, password, 2] 
    );

    console.log('corpUser created:', result.rows[0]);

 
    return NextResponse.json({ id: result.rows[0].id }, { status: 201 });
  } catch (error) {
    console.error('Error creating corpUser:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
