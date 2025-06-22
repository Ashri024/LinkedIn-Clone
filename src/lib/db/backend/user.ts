// lib/db/user.ts
import { connectDB } from '@/lib/mongodb';
import { Profile, IProfile } from '@/models/Profile';

export type IUserExistStatus = -1 | 0 | 1 | 2 | 3|4|5;

export async function userExistStatus(email?: string): Promise<IUserExistStatus> {
  if (!email) return -1;

  await connectDB(); // ensures DB is connected

  const user = await Profile.findOne({ email }) as IProfile | null;
  if (!user) return 0; // User does not exist
  return user.authStep;
}

