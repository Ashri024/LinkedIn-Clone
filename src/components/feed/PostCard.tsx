// src/components/feed/PostCard.tsx
'use client';

import { Card, CardContent } from "@/components/ui/card";
import { ThumbsUp, MessageCircle, Repeat2, Send } from "lucide-react";
import Image from "next/image";

interface PostCardProps {
  id: string;
  author: {
    name: string;
    title: string;
    avatar: string;
  };
  content: string;
  image?: string;
  reactions: number;
  comments: number;
  reposts: number;
}

export const PostCard = ({
  author,
  content,
  image,
  reactions,
  comments,
  reposts,
}: PostCardProps) => {
  return (
    <Card className="bg-white dark:bg-backgroundC-dark text-theme shadow-sm rounded-lg overflow-hidden">
      <CardContent className="p-4">
        {/* Top */}
        <div className="flex gap-3 items-start">
          <Image
            src={author.avatar || "https://res.cloudinary.com/djnhadxeb/image/upload/v1750766650/vecteezy_man-empty-avatar-vector-photo-placeholder-for-social_36594092_syrkdk.jpg"}
            alt={author.name}
            width={40}
            height={40}
            className="rounded-full"
          />
          <div>
            <p className="font-medium">{author.name}</p>
            <p className="text-sm text-muted-foreground">{author.title}</p>
          </div>
        </div>

        {/* Text Content */}
        <div className="mt-3 text-[15px] whitespace-pre-line">{content}</div>

        {/* Image */}
        {image && (
          <div className="mt-3">
            <Image
              src={image}
              alt="post image"
              width={600}
              height={350}
              className="rounded-md max-h-[400px] w-full object-cover"
            />
          </div>
        )}

        {/* Reactions */}
        <div className="mt-4 text-sm text-muted-foreground flex justify-between">
          <span>{reactions} Reactions</span>
          <span>{comments} Comments • {reposts} Reposts</span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between mt-2 text-theme text-sm font-medium border-t border-border pt-2">
          <button className="flex-1 py-2 hover:bg-muted rounded-md flex-center gap-2">
            <ThumbsUp size={16} /> Like
          </button>
          <button className="flex-1 py-2 hover:bg-muted rounded-md flex-center gap-2">
            <MessageCircle size={16} /> Comment
          </button>
          <button className="flex-1 py-2 hover:bg-muted rounded-md flex-center gap-2">
            <Repeat2 size={16} /> Repost
          </button>
          <button className="flex-1 py-2 hover:bg-muted rounded-md flex-center gap-2">
            <Send size={16} /> Send
          </button>
        </div>
      </CardContent>
    </Card>
  );
};
