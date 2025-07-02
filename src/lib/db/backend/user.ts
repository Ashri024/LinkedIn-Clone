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

// interface IUserProfileResponse {
//   status: number;
//   error?: string;
//   profile?: IProfilePopulated | undefined;
// }
// Fetch user by id
// export async function getUserById(userId: string): Promise<IUserProfileResponse> {
//   try {
//     await connectDB();

//     const profile = await Profile.findById(userId)
//       .populate('educations')
//       .populate('experiences')
//       .lean() as IProfilePopulated | null;

//     if (!profile) {
//       return { status: 404, error: "Profile not found" };
//     }

//     console.log("✅ Final populated profile:", profile);
//     return { status: 200, profile: profile };
//   } catch (error) {
//     const errorMessage = error instanceof Error ? error.message : "Failed to fetch profile";
//     console.error("❌ Error in GET /profile/[userId]:", errorMessage);
//     return { status: 500, error: errorMessage };
//   }
// }

