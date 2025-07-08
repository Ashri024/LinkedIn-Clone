// src/components/feed/PostInput.tsx
'use client';

import { Card } from "@/components/ui/card";
import { VideoIcon, ImageIcon, FileText } from "lucide-react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useDialogStore } from "@/store/dialogStore";
import { PostDialogBox } from "../post/PostDialogBox";

export const PostInput = () => {
  const { data: session } = useSession();

  return (
    <Card className="bg-white dark:bg-backgroundC-dark p-4 rounded-md shadow-sm text-theme border-none">
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
          onClick={() => useDialogStore.getState().openDialog(
            <PostDialogBox userId={session?.user?._id || ""} />
          )}
        />
      </div>

      <div className="flex justify-around mt-4 text-sm text-muted-foreground">
        <button className="linkedIn-button-ghost flex gap-2 items-center justify-center w-full"
        onClick={() => useDialogStore.getState().openDialog(
          <PostDialogBox userId={session?.user?._id || ""} />
        )}
        >
          <VideoIcon className="w-4 h-4" /> Video
        </button>
        <button className="linkedIn-button-ghost flex gap-2 items-center justify-center w-full"
        onClick={() => useDialogStore.getState().openDialog(
          <PostDialogBox userId={session?.user?._id || ""} />
        )}
        >
          <ImageIcon className="w-4 h-4" /> Photo
        </button>
        <button className="linkedIn-button-ghost flex gap-2 items-center justify-center w-full"
        onClick={() => useDialogStore.getState().openDialog(
          <PostDialogBox userId={session?.user?._id || ""} />
        )}
        >
          <FileText className="w-4 h-4" /> Write article
        </button>
      </div>
    </Card>
  );
};
