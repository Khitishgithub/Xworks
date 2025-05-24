// api/auth/updateApplicationStatus/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getClient } from '../../../../lib/db';

export async function PUT(request: NextRequest) {
  const client = await getClient();
  
  try {
    const { applicationId, status } = await request.json();
    
    if (!applicationId || !status) {
      return NextResponse.json({ message: 'Application ID and status are required' }, { status: 400 });
    }

    // Validate status
    const validStatuses = ['Pending', 'Accepted', 'Rejected'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ message: 'Invalid status' }, { status: 400 });
    }

    // Update the application status
    await client.query(`
      UPDATE JobApplications 
      SET status = $1, 
          updated_at = CURRENT_TIMESTAMP
      WHERE application_id = $2
    `, [status, applicationId]);

    return NextResponse.json({ 
      message: 'Application status updated successfully',
      status: status
    });
  } catch (error) {
    console.error('Error updating application status:', error);
    return NextResponse.json({ 
      message: 'Internal Server Error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  } finally {
    await client.release();
  }
}