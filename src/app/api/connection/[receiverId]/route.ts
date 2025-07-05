// linkedin-clone/src/app/api/connection/[receiverId]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { sendConnectionRequest,getConnection, removeConnection, withdrawRequest } from '@/lib/db/backend/connection';

// Get single connection request by receiverId
export async function GET(request: NextRequest, { params }: { params: { receiverId: string } }) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?._id;
  const {receiverId} = await params;

  if (!userId || !receiverId) {
    return NextResponse.json({ error: 'Missing user id' }, { status: 400 });
  }

  try {
    const connection = await getConnection(userId, receiverId);
    return NextResponse.json(connection);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An error occurred';
    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }
}

export async function POST(request: NextRequest, { params }: { params: { receiverId: string } }) {
  const session = await getServerSession(authOptions);
  const senderId = session?.user?._id;
  const {receiverId} = await params

  if (!senderId || !receiverId) {
    return NextResponse.json({ error: 'Missing user id' }, { status: 400 });
  }

  try {
    await sendConnectionRequest(senderId, receiverId);
    return NextResponse.json({ success: true });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An error occurred';
    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { receiverId: string } }) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?._id;
  const {receiverId} = await params;

  if (!userId || !receiverId) {
    return NextResponse.json({ error: 'Missing user id' }, { status: 400 });
  }

  // Try to remove connection, if not found, try to withdraw request
  try {
    await removeConnection(userId, receiverId);
    return NextResponse.json({ success: true, action: 'removed' });
  } catch {
    // If not connected, try to withdraw pending request
    try {
      await withdrawRequest(userId, receiverId);
      return NextResponse.json({ success: true, action: 'withdrawn' });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An error occurred';
      return NextResponse.json({ error: errorMessage }, { status: 400 });
    }
  }
}