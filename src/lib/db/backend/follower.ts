import { connectDB } from "@/lib/mongodb";
import { Follow } from "@/models/Follow";

export async function getFollowersCount(userId: string) {
    await connectDB();
    return Follow.countDocuments({ following: userId });
  }

export async function getFollowingCount(userId: string) {
await connectDB();
return Follow.countDocuments({ follower: userId });
}
  
// check if i follows another user or not
export async function isFollowing(followerId: string, followingId: string) {
  if (!followerId || !followingId) {
    return { status: 400, error: "Follower ID and Following ID are required" };
  }
  await connectDB();
  const follow = await Follow.findOne({ follower: followerId, following: followingId });
  return {
    status: 200,
    isFollowing: !!follow,
  };
}

export async function getFollowers(userId: string) {
  if (!userId) {
    return { status: 400, error: "User ID is required" };
  }
    await connectDB();
    const followers = await Follow.find({ following: userId }).populate('follower');
    // console.log('Followers data in backend:', followers);
    return {
      status: 200,
      followers: followers.map(f => f.follower),
    };
  }
export async function getFollowing(userId: string) {
  if (!userId) {
    return { status: 400, error: "User ID is required" };
  }
    await connectDB();
    const following = await Follow.find({ follower: userId }).populate('following');
    // console.log('Following data in backend:', following);
    return {
      status: 200,
      following: following.map(f => f.following),
    };
  }
    