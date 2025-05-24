//api/auth/jobApplications/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getClient } from '../../../../lib/db';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../[...nextauth]/route';

export async function POST(request: NextRequest) {
  const client = await getClient();
  
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { jobId } = await request.json();
    if (!jobId) {
      return NextResponse.json({ message: 'Job ID is required' }, { status: 400 });
    }
    
    // Start transaction
    await client.query('BEGIN');

    // Check if user has already applied
    const existingApplication = await client.query(
      `SELECT * FROM JobApplications WHERE job_id = $1 AND user_id = $2`,
      [jobId, session.user.id]
    );

    if (existingApplication.rows.length > 0) {
      await client.query('ROLLBACK');
      return NextResponse.json({ message: 'Already applied for this job' }, { status: 400 });
    }

    // Insert new application
    await client.query(
      `INSERT INTO JobApplications (job_id, user_id, application_date, status)
       VALUES ($1, $2, CURRENT_TIMESTAMP, 'Pending')`,
      [jobId, session.user.id]
    );

    // Get updated applicants count
    const { rows: [{ applicants_count }] } = await client.query(
      `SELECT applicants_count FROM JobDescriptions WHERE job_id = $1`,
      [jobId]
    );

    await client.query('COMMIT');

    return NextResponse.json({ 
      message: 'Application submitted successfully',
      applicants_count
    });
  } catch (error) {
    if (client) {
      await client.query('ROLLBACK');
    }
    console.error('Error submitting application:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  } finally {
    if (client) {
      client.release();
    }
  }
}