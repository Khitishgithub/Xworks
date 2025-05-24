//api/auth/jobdescription/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getClient } from '../../../../lib/db';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../[...nextauth]/route';

// Helper function for handling errors
const handleError = (error: any, message: string) => {
  console.error(message, error);
  return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
};


// Upload Job Description
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const jobTitle = formData.get('jobTitle') as string;
    const jobDescription = formData.get('jobDescription') as string;
    const salaryRange = formData.get('salaryRange') as string;
    const skills = formData.get('skills')?.toString().split(',').map(skill => skill.trim());
    const departmentId = parseInt(formData.get('departmentId') as string);

    if (!jobTitle || !jobDescription || !salaryRange || !skills || isNaN(departmentId)) {
      return NextResponse.json({ message: 'Invalid data' }, { status: 400 });
    }

    const userId = session.user.id; // Automatically use user_id from the session

    const client = await getClient();
    const { rows } = await client.query(`
      INSERT INTO JobDescriptions (job_title, user_id, job_description, salary_range, department_id, status, created_at)
      VALUES ($1, $2, $3, $4, $5, 'Open', CURRENT_TIMESTAMP)
      RETURNING job_id
    `, [jobTitle, userId, jobDescription, salaryRange, departmentId]);

    const jobId = rows[0].job_id;

    // Insert skills into JobSkills table with transaction
    await client.query('BEGIN');
    try {
      for (const skill of skills) {
        const skillResult = await client.query(`SELECT skill_id FROM corpSkills WHERE skill_name = $1`, [skill]);
        let skillId = skillResult.rows[0]?.skill_id;

        if (!skillId) {
          const newSkill = await client.query(`INSERT INTO corpSkills (skill_name) VALUES ($1) RETURNING skill_id`, [skill]);
          skillId = newSkill.rows[0].skill_id;
        }

        await client.query(`
          INSERT INTO JobSkills (job_id, user_id, skill_id) 
          VALUES ($1, $2, $3)
        `, [jobId, userId, skillId]);
      }
      await client.query('COMMIT');
    } catch (skillError) {
      await client.query('ROLLBACK');
      throw skillError;
    }

    return NextResponse.json({ message: 'Job description uploaded successfully' });
  } catch (error) {
    return handleError(error, 'Error uploading job description:');
  }
}

// Fetch Job Descriptions
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const userId = session.user.id;
    const client = await getClient();
    
    // Modified query to correctly count applicants
    const { rows } = await client.query(`
      SELECT 
        jd.job_id, 
        jd.job_title, 
        jd.job_description, 
        jd.salary_range, 
        d.department_name,
        ARRAY_AGG(DISTINCT cs.skill_name) AS skills,
        (
          SELECT COUNT(DISTINCT ja.application_id)
          FROM JobApplications ja
          WHERE ja.job_id = jd.job_id
        ) as applicants_count
      FROM JobDescriptions jd
      JOIN Departments d ON jd.department_id = d.department_id
      LEFT JOIN JobSkills js ON jd.job_id = js.job_id
      LEFT JOIN corpSkills cs ON js.skill_id = cs.skill_id
      WHERE jd.user_id = $1 AND jd.status = 'Open'
      GROUP BY 
        jd.job_id, 
        jd.job_title, 
        jd.job_description, 
        jd.salary_range,
        d.department_name
      ORDER BY jd.created_at DESC
    `, [userId]);

    // Log the results for debugging
    console.log('Job descriptions with applicant counts:', rows);

    return NextResponse.json(rows);
  } catch (error) {
    console.error('Error fetching job descriptions:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}


// Update Job Status to 'Closed'
export async function PATCH(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { jobId } = await request.json();
    if (!jobId) {
      return NextResponse.json({ message: 'Job ID is required' }, { status: 400 });
    }

    const client = await getClient();
    const { rowCount } = await client.query(`
      UPDATE JobDescriptions
      SET status = 'Closed'
      WHERE job_id = $1 AND user_id = $2
    `, [jobId, session.user.id]);

    if (rowCount === 0) {
      return NextResponse.json({ message: 'Job description not found or not authorized' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Job description deactivated successfully' });
  } catch (error) {
    return handleError(error, 'Error updating job status:');
  }
}
