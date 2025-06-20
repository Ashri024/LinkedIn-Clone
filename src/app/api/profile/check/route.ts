import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { userExistStatus } from '@/lib/db/backend/user';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email) {
      return NextResponse.json({ status: -1, error: 'Email is required' }, { status: 400 });
    }

    await connectDB(); // optional here, already in `userExistStatus`
    const status = await userExistStatus(email); // returns 0, 1, or 2

    return NextResponse.json({ status });
  } catch (err) {
    console.error('Profile check error:', err);
    return NextResponse.json({ status: -1, error: 'Server error' }, { status: 500 });
  }
}
