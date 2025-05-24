export const dynamic = 'force-dynamic';


import { NextRequest, NextResponse } from 'next/server';
import { getClient } from '../../../../lib/db';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../[...nextauth]/route';

// Interface definitions
interface JobSkillsRow {
  job_id: string;
  job_title: string;
  job_description: string;
  salary_range: string;
  applicants_count: number;
  department_name: string;
  job_skills: string[];
}

interface MatchedJob extends JobSkillsRow {
  skillMatchPercentage: number;
  hasApplied: boolean;
  applicationStatus?: 'Pending' | 'Accepted' | 'Rejected';
}

interface ResumeRow {
  extracted_skills: string[] | string;
}

interface JobQueryResult extends JobSkillsRow {
  has_applied: boolean;
  application_status: string | null;
}

function calculateSkillMatchPercentage(jobSkills: string[], resumeSkills: string[]): number {
  const normalizedJobSkills = jobSkills.map((skill: string) => skill.toLowerCase().trim());
  const normalizedResumeSkills = resumeSkills.map((skill: string) => skill.toLowerCase().trim());

  const matchedSkills = normalizedJobSkills.filter((skill: string) =>
    normalizedResumeSkills.includes(skill)
  );

  const matchPercentage = (matchedSkills.length / normalizedJobSkills.length) * 100;
  return Math.round(matchPercentage);
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const userId = session.user.id;
    const client = await getClient();

    const resumeResult = await client.query<ResumeRow>(
      `SELECT extracted_skills FROM resumes WHERE user_id = $1 AND status = 'Active' LIMIT 1`,
      [userId]
    );

    if (resumeResult.rows.length === 0) {
      return NextResponse.json({ message: 'No active resume found' }, { status: 404 });
    }

    let extractedSkills: string[] = [];
    try {
      const skillsData = resumeResult.rows[0].extracted_skills;
      extractedSkills = Array.isArray(skillsData)
        ? skillsData
        : typeof skillsData === 'string'
        ? JSON.parse(skillsData)
        : [];
    } catch {
      extractedSkills = [];
    }

    const jobsResult = await client.query<JobQueryResult>(`
      SELECT 
        jd.job_id, 
        jd.job_title, 
        jd.job_description, 
        jd.salary_range, 
        jd.applicants_count,
        d.department_name,
        ARRAY_AGG(cs.skill_name) AS job_skills,
        EXISTS (
          SELECT 1 
          FROM JobApplications ja 
          WHERE ja.job_id = jd.job_id 
          AND ja.user_id = $1
        ) as has_applied,
        (
          SELECT ja.status 
          FROM JobApplications ja 
          WHERE ja.job_id = jd.job_id 
          AND ja.user_id = $1
          LIMIT 1
        ) as application_status
      FROM JobDescriptions jd
      JOIN Departments d ON jd.department_id = d.department_id
      LEFT JOIN JobSkills js ON jd.job_id = js.job_id
      LEFT JOIN corpSkills cs ON js.skill_id = cs.skill_id
      WHERE jd.status = 'Open'
      GROUP BY jd.job_id, d.department_name
    `, [userId]);

    const matchedJobs = jobsResult.rows
      .map((job: JobQueryResult): MatchedJob => ({
        ...job,
        hasApplied: job.has_applied,
        applicationStatus: job.application_status as 'Pending' | 'Accepted' | 'Rejected' | undefined,
        skillMatchPercentage: calculateSkillMatchPercentage(job.job_skills, extractedSkills)
      }))
      .filter((job: MatchedJob) => job.skillMatchPercentage >= 30)
      .sort((a: MatchedJob, b: MatchedJob) => b.skillMatchPercentage - a.skillMatchPercentage);

    return NextResponse.json({
      matchedJobs,
      userSkills: extractedSkills
    });
  } catch (error) {
    console.error('Error in job skills matching:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}