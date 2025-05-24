import { NextRequest, NextResponse } from 'next/server';
import { getClient } from '../../../../lib/db';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]/route';

export async function GET(request: NextRequest) {
  let client;

  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    // Get userId from query parameters
    const url = new URL(request.url);
    const userId = url.searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ message: 'User ID is required' }, { status: 400 });
    }

    // Connect to the database
    client = await getClient();

    // Fetch the active resume for the specified user
    const result = await client.query(
      `SELECT resume_file, resume_title FROM resumes WHERE user_id = $1 AND status = 'Active' LIMIT 1`,
      [userId]
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ message: 'No active resume found' }, { status: 404 });
    }

    const resumeFile = result.rows[0].resume_file;
    const resumeTitle = result.rows[0].resume_title;

    // Serve the resume file as a PDF
    return new NextResponse(resumeFile, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${resumeTitle}.pdf"`,
      },
    });
  } catch (error) {
    console.error('Error fetching resume:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  } finally {
    if (client) {
      client.release();
    }
  }
}