// lib/db/user.ts
import { connectDB } from '@/lib/mongodb';
import { Profile } from '@/models/Profile';

export async function doesUserExist(email: string): Promise<boolean> {
  if (!email) return false;

  await connectDB(); // ensures DB is connected

  const user = await Profile.findOne({ email });
  return !!user;
}

