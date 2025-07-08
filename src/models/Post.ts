// src/models/Post.ts
import mongoose, { Document, Schema, model, models } from "mongoose";

export interface IPost extends Document {
  author: mongoose.Types.ObjectId;
  content?: string;
  images?: string[];  // Max 4 images
  video?: string;     // Single video
  likes: mongoose.Types.ObjectId[]; // array of user ids who liked
  comments: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const PostSchema = new Schema<IPost>(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: "Profile",
      required: true,
    },
    content: {
      type: String,
      maxlength: 2000,
    },
    images: {
      type: [String],
      validate: [(arr: string[]) => arr.length <= 4, "{PATH} exceeds the limit of 4"],
      default: [],
    },
    video: {
      type: String,
      default: null,
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Profile",
      },
    ],
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  { timestamps: true }
);

// Ensure a post cannot have both images and video
PostSchema.pre("save", function (next) {
  if (this.images?.length && this.video) {
    return next(new Error("A post can contain either images or a video, not both."));
  }
  next();
});

export const Post = models.Post || model<IPost>("Post", PostSchema);
