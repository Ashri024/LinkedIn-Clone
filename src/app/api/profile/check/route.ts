import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Profile } from '@/models/Profile';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email) return NextResponse.json({ exists: false }, { status: 400 });

    await connectDB();
    const existingProfile = await Profile.findOne({ email });
    return NextResponse.json({ exists: !!existingProfile });
  } catch (err) {
    console.error('Profile check error:', err);
    return NextResponse.json({ exists: false, error: 'Server error' }, { status: 500 });
  }
}
