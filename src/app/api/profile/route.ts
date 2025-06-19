import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb'; // your DB connection
import { Profile } from '@/models/Profile'; // your model

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();

    const existing = await Profile.findOne({ email: body.email });
    if (existing) {
      return NextResponse.json({ message: 'Profile already exists' }, { status: 400 });
    }

    const profile = new Profile(body);
    await profile.save();

    return NextResponse.json({ message: 'Profile created' });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}

