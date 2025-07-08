import mongoose, { Schema, model, models, Document } from "mongoose";

export interface IComment extends Document {
  post: mongoose.Types.ObjectId;
  author: mongoose.Types.ObjectId;
  content: string;
  parentComment?: mongoose.Types.ObjectId; // for nesting
  reactions: {
    user: mongoose.Types.ObjectId;
    reaction: "like" | "love" | "celebrate" | "insightful" | "funny";
  }[];
  createdAt: Date;
  updatedAt: Date;
}

const CommentSchema = new Schema<IComment>(
  {
    post: { type: Schema.Types.ObjectId, ref: "Post", required: true },
    author: { type: Schema.Types.ObjectId, ref: "Profile", required: true },
    content: { type: String, required: true },
    parentComment: { type: Schema.Types.ObjectId, ref: "Comment", default: null },
    reactions: [
      {
        user: { type: Schema.Types.ObjectId, ref: "Profile" },
        reaction: {
          type: String,
          enum: ["like", "love", "celebrate", "insightful", "funny"],
        },
      },
    ],
  },
  { timestamps: true }
);

export const Comment = models.Comment || model<IComment>("Comment", CommentSchema);
