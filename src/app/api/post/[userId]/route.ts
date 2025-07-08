// src/app/api/posts/[userId]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getPostsByUser } from '@/lib/db/backend/post';
import { connectDB } from '@/lib/mongodb';
// import { getServerSession } from 'next-auth';
// import { authOptions } from '@/lib/authOptions';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  await connectDB();
//   const session = await getServerSession(authOptions);
  // Optionally, check session for permissions

  const { userId } =await params;
  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
  }

  try {
    const posts = await getPostsByUser(userId);
    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    const errMessage = error instanceof Error ? error.message : 'Internal Server Error';
    return NextResponse.json({ error:errMessage }, { status: 500 });
  }
}