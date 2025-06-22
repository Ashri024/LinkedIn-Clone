// /api/profile/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Profile } from '@/models/Profile';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    await Profile.init();
    const body = await req.json();

    if (body.password) {
      body.password = await bcrypt.hash(body.password, 10);
    }
    if(body.authProvider === 'google') {
      // For Google auth, we already have a verified email
      body.emailVerified = true;
    }
    const profile = new Profile(body);
    await profile.save();

    return NextResponse.json({ message: 'Profile created successfully' }, { status: 201 });
  } catch (err: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
    if (err.code === 11000) {
      const field = Object.keys(err.keyPattern || {})[0] || 'Field';
      return NextResponse.json({ message: `${field} already exists` }, { status: 400 });
    }
    return NextResponse.json({ message: err.message || 'Server error' }, { status: 500 });
  }
}

// PATCH endpoint for partial updates (used in onboarding steps)
export async function PATCH(req: NextRequest) {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const updates = await req.json();

    // Flatten nested updates for MongoDB $set
    const flattenedUpdates: Record<string, unknown> = {};

    const flatten = (obj: any, prefix = '') => { // eslint-disable-line @typescript-eslint/no-explicit-any
      for (const key in obj) {
        const value = obj[key];
        const newKey = prefix ? `${prefix}.${key}` : key;
        if (value && typeof value === 'object' && !Array.isArray(value)) {
          flatten(value, newKey);
        } else {
          flattenedUpdates[newKey] = value;
        }
      }
    };

    flatten(updates);

    const result = await Profile.findOneAndUpdate(
      { email: session.user.email },
      { $set: flattenedUpdates },
      { new: true }
    );

    if (!result) {
      return NextResponse.json({ message: 'Profile not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Profile updated successfully', profile: result }, { status: 200 });
  } catch (err: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
    return NextResponse.json({ message: err.message || 'Server error' }, { status: 500 });
  }
}
