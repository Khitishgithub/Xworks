//api/auth/resumeuploadAndView/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getClient } from '../../../../lib/db';  // Your db.ts file
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]/route';

// POST handler: Upload a resume and mark it as active
export async function POST(request: NextRequest) {
  let client;
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const userId = session.user.id;
    const formData = await request.formData();
    const resumeFile = formData.get('resumeFile') as File;
    const resumeTitle = formData.get('resumeTitle') as string;

    if (!resumeFile || !resumeTitle) {
      return NextResponse.json({ message: 'Invalid data' }, { status: 400 });
    }

    // Convert the file to a buffer (binary data)
    const fileBuffer = Buffer.from(await resumeFile.arrayBuffer());

    // Connect to the database and start a transaction
    client = await getClient();
    await client.query('BEGIN');

    // Step 1: Mark all previous resumes as inactive
    await client.query(
      `UPDATE resumes SET status = 'Inactive' WHERE user_id = $1 AND status = 'Active'`,
      [userId]
    );

    // Step 2: Insert the new resume and mark it as active
    const query = `
      INSERT INTO resumes (user_id, resume_title, resume_file, status, created_at, updated_at)
      VALUES ($1, $2, $3, 'Active', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    `;
    await client.query(query, [userId, resumeTitle, fileBuffer]);

    // Commit the transaction
    await client.query('COMMIT');

    return NextResponse.json({ message: 'Resume uploaded and marked as active successfully' });
  } catch (error) {
    if (client) {
      await client.query('ROLLBACK');  // Rollback the transaction in case of error
    }
    console.error('Error uploading resume:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  } finally {
    if (client) {
      client.release();  // Release the client back to the pool
    }
  }
}

// GET handler: Retrieve the active resume for viewing
export async function GET(request: NextRequest) {
  let client;

  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const userId = session.user.id;

    // Connect to the database
    client = await getClient();

    // Fetch the active resume for the user
    const result = await client.query(
      `SELECT resume_file, resume_title FROM resumes WHERE user_id = $1 AND status = 'Active' LIMIT 1`,
      [userId]
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ message: 'No active resume found' }, { status: 404 });
    }

    const resumeFile = result.rows[0].resume_file;
    const resumeTitle = result.rows[0].resume_title;

    // Serve the resume file as a PDF or document
    return new NextResponse(resumeFile, {
      headers: {
        'Content-Type': 'application/pdf',  // Adjust this if you're supporting different file types
        'Content-Disposition': `inline; filename="${resumeTitle}.pdf"`,  // Display in browser or allow download
      },
    });
  } catch (error) {
    console.error('Error fetching resume:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  } finally {
    if (client) {
      client.release();  // Release the client back to the pool
    }
  }
}
