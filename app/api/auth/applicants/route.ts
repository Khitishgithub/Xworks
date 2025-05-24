// api/auth/applicants/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getClient } from '../../../../lib/db';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../[...nextauth]/route';

export async function GET(request: NextRequest) {
    const client = await getClient();
    
    try {
      const session = await getServerSession(authOptions);
      if (!session || !session.user) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
      }
  
      const searchParams = new URL(request.url).searchParams;
      const jobId = searchParams.get('jobId');
  
      if (!jobId) {
        return NextResponse.json({ message: 'Job ID is required' }, { status: 400 });
      }
  
      // First, verify the job exists and belongs to the current user
      const jobCheck = await client.query(`
        SELECT job_id, job_title 
        FROM JobDescriptions 
        WHERE job_id = $1 AND user_id = $2
      `, [jobId, session.user.id]);
  
      if (jobCheck.rows.length === 0) {
        return NextResponse.json({ message: 'Job not found or unauthorized' }, { status: 404 });
      }
  
      // Debug: Log the job we're checking
      console.log('Checking applications for job:', jobCheck.rows[0]);
  
      // Modified query with detailed logging
      const applicantsQuery = `
        SELECT 
          u.name as user_name,
          u.email,
          ja.created_at as application_date,
          ja.status,
          ja.application_id,
          ja.user_id as applicant_id
        FROM JobApplications ja
        INNER JOIN Users u ON ja.user_id = u.id
        WHERE ja.job_id = $1
      `;
  
      // Debug: Log the query we're about to execute
      console.log('Executing query:', applicantsQuery, 'with jobId:', jobId);
  
      const { rows } = await client.query(applicantsQuery, [jobId]);
  
      // Debug: Log detailed information about the results
      console.log(`Found ${rows.length} applicants for job ID ${jobId}`);
      if (rows.length === 0) {
        // Additional debug query to check JobApplications table directly
        const checkApplications = await client.query(
          'SELECT COUNT(*) FROM JobApplications WHERE job_id = $1',
          [jobId]
        );
        console.log('Direct JobApplications count:', checkApplications.rows[0].count);
      }
  
      return NextResponse.json(rows);
    } catch (error) {
      console.error('Error fetching applicants:', error);
      return NextResponse.json({ 
        message: 'Internal Server Error',
        details: error instanceof Error ? error.message : 'Unknown error'
      }, { status: 500 });
    } finally {
      await client.release();
    }
  }
  