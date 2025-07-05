// src/app/api/connection/[senderId]/ignore/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { rejectRequest } from '@/lib/db/backend/connection';

export async function POST(request: NextRequest, { params }: { params: Promise<{ senderId: string }> }) {
  const session = await getServerSession(authOptions);
  const receiverId = session?.user?._id;
  const {senderId} = await params;

  if (!receiverId || !senderId) {
    return NextResponse.json({ error: 'Missing user id' }, { status: 400 });
  }

  try {
    await rejectRequest(receiverId, senderId);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 400 });
  }
}