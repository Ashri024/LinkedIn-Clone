// src/components/feed/PostInput.tsx
'use client';

import { Card } from "@/components/ui/card";
import { VideoIcon, ImageIcon, FileText } from "lucide-react";
import Image from "next/image";
import { useSession } from "next-auth/react";

export const PostInput = () => {
  const { data: session } = useSession();

  return (
    <Card className="bg-white dark:bg-backgroundC-dark p-4 rounded-xl shadow-sm text-theme">
      <div className="flex items-center gap-3">
        <Image
         src={session?.user?.image || "https://res.cloudinary.com/djnhadxeb/image/upload/v1750766650/vecteezy_man-empty-avatar-vector-photo-placeholder-for-social_36594092_syrkdk.jpg"}
          alt="avatar"
          width={44}
          height={44}
          className="rounded-full"
        />
        <input
          placeholder="Start a post"
          className="flex-1 rounded-full bg-muted px-4 py-2 text-sm outline-none dark:bg-neutral-800"
        />
      </div>

      <div className="flex justify-around mt-4 text-sm text-muted-foreground">
        <button className="flex items-center gap-2 hover:text-primary">
          <VideoIcon className="w-4 h-4" /> Video
        </button>
        <button className="flex items-center gap-2 hover:text-primary">
          <ImageIcon className="w-4 h-4" /> Photo
        </button>
        <button className="flex items-center gap-2 hover:text-primary">
          <FileText className="w-4 h-4" /> Write article
        </button>
      </div>
    </Card>
  );
};
