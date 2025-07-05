import { NextRequest, NextResponse } from 'next/server';
import { getConnectionCount } from '@/lib/db/backend/connection';

export async function GET(req: NextRequest, { params }: { params: { userId: string } }) {
  const {userId} = await params;

  if (!userId) {
    return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
  }

  try {
    const connectionCount = await getConnectionCount(userId);
    return NextResponse.json({ connectionCount });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An error occurred';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}