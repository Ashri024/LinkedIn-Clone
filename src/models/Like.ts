import mongoose, { Schema, model, models, Document } from "mongoose";

export interface ILike extends Document {
  post: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  reaction: "like" | "love" | "support" | "celebrate" | "insightful" | "funny";
  createdAt: Date;
  updatedAt: Date;
}

const LikeSchema = new Schema<ILike>(
  {
    post: { type: Schema.Types.ObjectId, ref: "Post", required: true },
    user: { type: Schema.Types.ObjectId, ref: "Profile", required: true },
    reaction: {
      type: String,
      enum: ["like", "love", "support", "celebrate", "insightful", "funny"],
      default: "like",
    },
  },
  { timestamps: true }
);

LikeSchema.index({ post: 1, user: 1 }, { unique: true }); // One like per post per user

export const Like = models.Like || model<ILike>("Like", LikeSchema);
