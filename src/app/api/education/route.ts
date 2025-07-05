import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { connectDB } from '@/lib/mongodb';
import { Education } from '@/models/Education';
import { Profile } from '@/models/Profile';
// let apiCall =0;
// /api/education
// /auth/onboarding
export async function POST(req: NextRequest) {
  // console.log('/route/education: ', ++apiCall);
  try {
    await connectDB();
    const session = await getServerSession(authOptions);

    if (!session?.user?.email || !session.user._id) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const profileId = session.user._id;
    const body = await req.json();

    const education = new Education({
      ...body,
      profileId,
    });

    const educationSaved=await education.save();

    await Profile.findByIdAndUpdate(profileId, {
      $push: { educations: education._id },
    });

    return NextResponse.json({ message: 'Education saved', education: educationSaved }, { status: 201 });
  } catch (err: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
    return NextResponse.json({ message: err.message || 'Server error' }, { status: 500 });
  }
}
