// lib/db/user.ts
import { SuggestionCardProps } from '@/components/myNetwork/SuggestionCard';
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

// Get all users from db except the current user
export async function getAllUsersExceptCurrent(currentUserEmail: string): Promise<SuggestionCardProps[]> {
  if (!currentUserEmail) return [];

  await connectDB(); // ensures DB is connected

  const users = await Profile.find({ email: { $ne: currentUserEmail } })
    .select('firstName lastName profileImageUrl email headline')
    .lean();

  // Convert to plain objects and add _id as string
  return users.map((user) => ({
    _id: user._id.toString(),
    firstName: user.firstName,
    lastName: user.lastName,
    profileImageUrl: user.profileImageUrl,
    email: user.email,
    headline: user.headline,
  }));
}
