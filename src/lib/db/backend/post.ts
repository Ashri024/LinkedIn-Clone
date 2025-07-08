// lib/db/postHandlers.ts
import { Post, IPost } from '@/models/Post';
import mongoose from 'mongoose';
import { Follow } from '@/models/Follow';
import { getConnectionsIds } from './connection';


// Post Management
export const createPost = async (authorId?: string, content?: string, images?: string[], video?: string): Promise<IPost> => {
  if (!authorId) {
    return Promise.reject(new Error('Author ID is required'));
  }
  const newPost = new Post({ author: authorId, content, images, video });
  return await newPost.save();
};


export const getAllPosts = async (
  userId: string,
  page = 1,
  limit = 5
): Promise<IPost[]> => {
  const skip = (page - 1) * limit;

  // Get following and connection IDs
  const followingDocs = await Follow.find({ follower: userId });
  const followingIds = followingDocs.map(doc => doc.following.toString());

  // const userProfile = await Profile.findById(userId);
  // const connectionIds = userProfile?.connections.map(conn => conn.toString()) || [];

  // Get connectionIds
  const connectionIds = await getConnectionsIds(userId);

  // Priority score: 3 (following), 2 (connection), 1 (others)
  const posts = await Post.aggregate([
    {
      $addFields: {
        priority: {
          $switch: {
            branches: [
              { case: { $in: ['$author', followingIds.map(id => mongoose.Types.ObjectId.createFromHexString(id))] }, then: 3 },
              { case: { $in: ['$author', connectionIds.map(id => mongoose.Types.ObjectId.createFromHexString(id))] }, then: 2 }
            ],
            default: 1
          }
        }
      }
    },
    { $sort: { priority: -1, createdAt: -1 } },
    { $skip: skip },
    { $limit: limit }
  ]);

  const populatedPosts = await Post.populate(posts, { path: 'author' });
  return populatedPosts as IPost[];
};

export const getPostById = async (postId: string): Promise<IPost | null> => {
  return await Post.findById(postId).populate('author');
};

export const getPostsByUser = async (userId: string): Promise<IPost[]> => {
  return await Post.find({ author: userId }).populate('author').sort({ createdAt: -1 });
};

export const deletePost = async (postId: string, userId: string): Promise<boolean> => {
  const post = await Post.findById(postId);
  if (post && post.author.toString() === userId) {
    await post.deleteOne();
    return true;
  }
  return false;
};
