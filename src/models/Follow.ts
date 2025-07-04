import mongoose, { Document } from 'mongoose';

export interface IFollow extends Document {
  follower: mongoose.Types.ObjectId; // the user who follows
  following: mongoose.Types.ObjectId; // the user being followed
  createdAt: Date;
}

const followSchema = new mongoose.Schema<IFollow>(
  {
    follower: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile', required: true },
    following: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile', required: true },
  },
  { timestamps: true }
);

// Unique constraint to prevent duplicates
followSchema.index({ follower: 1, following: 1 }, { unique: true });

export const Follow = mongoose.models.Follow || mongoose.model<IFollow>('Follow', followSchema);
