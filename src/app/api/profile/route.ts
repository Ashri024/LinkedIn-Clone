import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Profile } from '@/models/Profile';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    await Profile.init(); // ensures indexes are ready to catch dupes

    const body = await req.json();

    if (body.password) {
      body.password = await bcrypt.hash(body.password, 10);
    }

    const profile = new Profile(body);
    await profile.save();

    return NextResponse.json({ message: 'Profile created successfully' }, { status: 201 });
  } catch (err: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
    console.error('Profile creation error:', err);

    // Handle duplicate key error
    if (err.code === 11000) {
      const field = Object.keys(err.keyPattern || {})[0] || 'Field';
      return NextResponse.json({ message: `${field} already exists` }, { status: 400 });
    }

    return NextResponse.json({ message: err.message || 'Server error' }, { status: 500 });
  }
}
