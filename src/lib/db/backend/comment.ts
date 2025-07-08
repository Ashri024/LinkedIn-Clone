import { Comment, IComment } from '@/models/Comment';
import { Like, ILike } from '@/models/Like';

// Comment Management
export const addComment = async (postId: string, userId: string, content: string, parentCommentId?: string): Promise<IComment> => {
    const comment = new Comment({
      post: postId,
      author: userId,
      content,
      parentComment: parentCommentId || null
    });
    return await comment.save();
  };
  
  export const getComments = async (postId: string): Promise<IComment[]> => {
    const comments = await Comment.find({ post: postId }).populate('author');
    return comments;
  };
  
  export const deleteComment = async (commentId: string, userId: string): Promise<boolean> => {
    const comment = await Comment.findById(commentId);
    if (comment && comment.author.toString() === userId) {
      await comment.deleteOne();
      return true;
    }
    return false;
  };
  
  export const addReactionToComment = async (commentId: string, userId: string, reaction: ILike['reaction']): Promise<ILike> => {
    const reactionData = await Like.findOneAndUpdate(
      { comment: commentId, user: userId },
      { reaction },
      { new: true, upsert: true }
    );
    return reactionData;
  };
  
  export const removeReactionFromComment = async (commentId: string, userId: string): Promise<boolean> => {
    const result = await Like.findOneAndDelete({ comment: commentId, user: userId });
    return !!result;
  };
  