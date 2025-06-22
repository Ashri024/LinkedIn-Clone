import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { connectDB } from '@/lib/mongodb';
import { Profile } from '@/models/Profile';

export async function PATCH(req: Request) {
  await connectDB();
  const session = await getServerSession(authOptions);
  const { email: newEmail } = await req.json();

  if (!session?.user?.email || !newEmail) {
    return NextResponse.json({ message: 'Missing session or new email' }, { status: 400 });
  }

  // Check if new email already exists in any profile
  const existing = await Profile.findOne({ email: newEmail });
  if (existing && existing.email !== session.user.email) {
    return NextResponse.json({ message: 'Email already in use' }, { status: 409 });
  }

  // Update email, mark verified and authStep
  const updatedProfile = await Profile.findOneAndUpdate(
    { email: session.user.email },
    {
      $set: {
        email: newEmail,
        emailVerified: true,
        authStep: 4,
      },
    },
    { new: true }
  );

  if (!updatedProfile) {
    return NextResponse.json({ message: 'Profile not found' }, { status: 404 });
  }

  return NextResponse.json({ message: 'Email updated successfully' });
}
