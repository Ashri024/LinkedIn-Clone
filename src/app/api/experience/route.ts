import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { connectDB } from '@/lib/mongodb';
import { Experience } from '@/models/Experience';
import { Profile } from '@/models/Profile';

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);
    if (!session?.user?.email || !session.user._id) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const profileId = session.user._id;

    const newExperience = new Experience({
      ...body,
      profileId,
    });

    await newExperience.save();

    await Profile.findByIdAndUpdate(profileId, {
      $push: { experiences: newExperience._id },
      $set: { authStep: 3 },
    });
    // console.log('Profile updated with new experience:', res);
    return NextResponse.json({ message: 'Experience saved', experience: newExperience });
  } catch (err: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
    return NextResponse.json({ message: err.message || 'Server error' }, { status: 500 });
  }
}
