import { Like, ILike } from '@/models/Like';
import mongoose from 'mongoose';

export const addOrUpdateLike = async (postId: string, userId: string, reaction: ILike['reaction']): Promise<ILike> => {
    const like = await Like.findOneAndUpdate(
      { post: postId, user: userId },
      { reaction },
      { new: true, upsert: true }
    );
    return like;
  };
  
  export const removeLike = async (postId: string, userId: string): Promise<boolean> => {
    const result = await Like.findOneAndDelete({ post: postId, user: userId });
    return !!result;
  };
  
  export const getLikesByPost = async (postId: string): Promise<ILike[]> => {
    return await Like.find({ post: postId }).populate('user');
  };
  
  export const countLikesGroupedByReaction = async (postId: string): Promise<Record<string, number>> => {
    const result = await Like.aggregate([
      { $match: { post: new mongoose.Types.ObjectId(postId) } },
      { $group: { _id: '$reaction', count: { $sum: 1 } } }
    ]);
    const counts: Record<string, number> = {};
    result.forEach(r => counts[r._id] = r.count);
    return counts;
  };