// /app/api/post/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createPost, getAllPosts } from '@/lib/db/backend/post';
import { connectDB } from '@/lib/mongodb';
import { authOptions } from '@/lib/authOptions';
import { getServerSession } from 'next-auth';

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user || !session.user._id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get('page') || '1', 10);

  try {
    const posts = await getAllPosts(session?.user?._id, page);
    // console.log('Fetched posts:', posts);
    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { content, images = [], video = undefined } = body;

    // Enforce mutual exclusivity between images and video
    if (images.length > 0 && video) {
      return NextResponse.json({ error: 'Post can only contain images or a video, not both' }, { status: 400 });
    }

    if (images.length > 4) {
      return NextResponse.json({ error: 'A maximum of 4 images is allowed' }, { status: 400 });
    }

    const newPost = await createPost(session?.user?._id, content, images, video);
    return NextResponse.json({ message: 'Post created', post: newPost }, { status: 201 });
  } catch (error) {
    console.error('POST /api/post error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
