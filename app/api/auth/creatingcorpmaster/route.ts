import { NextRequest, NextResponse } from 'next/server';
import { getClient } from '../../../../lib/db';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../[...nextauth]/route';

export async function POST(request: NextRequest) {
  try {
    console.log('Received POST request for CorporateMaster');

    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

  
    const { corporate_name, registration_number, industry, headquarters_address, contact_email, contact_phone, established_date, tax_id, website_url } = await request.json();

   
    const client = await getClient();


    const result = await client.query(`
      INSERT INTO CorporateMaster (
        corporate_name, 
        registration_number, 
        industry, 
        headquarters_address, 
        contact_email, 
        contact_phone, 
        established_date, 
        tax_id, 
        website_url
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING corporate_id
    `, [corporate_name, registration_number, industry, headquarters_address, contact_email, contact_phone, established_date, tax_id, website_url]);

    console.log('Corporate entity created:', result.rows[0]);

    
    return NextResponse.json({ corporate_id: result.rows[0].corporate_id }, { status: 201 });
  } catch (error) {
    console.error('Error creating corporate entity:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
