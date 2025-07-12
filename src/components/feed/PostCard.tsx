// src/components/feed/PostCard.tsx
'use client';

import { Card, CardContent } from "@/components/ui/card";
import { ThumbsUp, MessageCircle } from "lucide-react";
import Image from "next/image";
import { IoMdGlobe } from "react-icons/io";
import { PostImageGallery } from "../post/PostImageGallery";
import { uploadedTimeAgo } from "@/lib/utils";
import DefaultImage from '@/../public/default-profile.svg'; // Adjust the path as necessary

export interface PostCardProps {
  _id: string;
  author: {
    _id: string; // Author's unique ID
    firstName: string;
    lastName?: string;
    headline?: string; // Author's headline or profession
    profileImageUrl?: string; // URL to author's profile image
  };
  content: string;
  images?: string[]; // Max 4 images
  video?: string; // Single video
  likes?: {
    _id: string;
    name: string;}[]; // Array of user objects who liked the post
  comments?: {
    _id: string;
    content: string;
  } [];
  createdAt: string;
  updatedAt: string;

}

export const PostCard = ({post}: {post:PostCardProps}) => {
  const name = post.author? post?.author?.firstName + (post?.author?.lastName ? " " + post?.author?.lastName : "") : "Unknown User";
  
  if (!post?.author?._id){
    return null;
  }
  return (
    <Card className="bg-white dark:bg-backgroundC-dark text-theme shadow-sm rounded-md overflow-hidden py-0 border-none">
      <CardContent className="p-4">
        {/* Top */}
        <div className="flex gap-3 items-start">
          <Image
            src={post?.author?.profileImageUrl || DefaultImage}
            alt={name || "User Avatar"}
            width={50}
            height={50}
            className="rounded-full mt-1"
          />
          <div className="flex flex-col gap-0">
            <div className="flex gap-2 items-end">
              <span className="text-base font-medium">
                {name}
              </span> 
              <span className="text-xs text-muted-foreground">
                • 1st
              </span>
            </div>
            <p className="text-xs text-muted-foreground">{post?.author?.headline}</p>
            <div className="flex gap-1 items-center text-muted-foreground ">
              <p className="text-xs py-0 ">
                {uploadedTimeAgo(post?.createdAt)}
              </p>
              <div className="flex-center gap-1 h-5">
              • <IoMdGlobe className="inline-block " size={16}/>
              </div>
            </div>
          </div>
        </div>

        {/* Text Content */}
        <div className="mt-3 text-[15px] whitespace-pre-line">{post?.content}</div>

        {/* Image */}
        {post?.images && post?.images?.length > 0 && (
          <PostImageGallery images={post?.images} />
        )}

        {post?.video && (
          <div className="mt-3">
            <video
              src={post?.video}
              controls
              className="rounded-md max-h-[400px] w-full object-cover"
            />
          </div>
        )}

        {/* Reactions */}
        <div className="mt-4 text-sm text-muted-foreground flex justify-between">
          <span>{post?.likes && post?.likes?.length} Reactions</span>
          <span>{post?.comments && post?.comments?.length} Comments</span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between mt-2 text-theme text-sm font-medium border-t border-border pt-2">
          <button className="flex-1 py-2 hover:bg-muted rounded-md flex-center gap-2 cursor-pointer">
            <ThumbsUp size={16} /> Like
          </button>
          <button className="flex-1 py-2 hover:bg-muted rounded-md flex-center gap-2 cursor-pointer">
            <MessageCircle size={16} /> Comment
          </button>
          {/* <button className="flex-1 py-2 hover:bg-muted rounded-md flex-center gap-2">
            <Repeat2 size={16} /> Repost
          </button>
          <button className="flex-1 py-2 hover:bg-muted rounded-md flex-center gap-2">
            <Send size={16} /> Send
          </button> */}
        </div>
      </CardContent>
    </Card>
  );
};
