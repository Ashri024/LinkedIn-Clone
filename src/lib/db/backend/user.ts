// lib/db/user.ts
import { connectDB } from '@/lib/mongodb';
import { Profile, IProfile } from '@/models/Profile';

export async function userExistStatus(email: string): Promise<number> {
  if (!email) return -1;

  await connectDB(); // ensures DB is connected

  const user = await Profile.findOne({ email }) as IProfile | null;
  if (!user) return 0; // User does not exist
  if (user.authStep === 1) return 1; // User exists and authStep is 1
  return 2; // User exists but authStep is not 1
}

