'use client';

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useEffect, useMemo, useState } from "react";
import { ImageIcon, VideoIcon, Trash2, Pencil } from "lucide-react";
import { useDialogStore } from "@/store/dialogStore";
import { EditImageDialog } from "./EditImageDialog";
import Image from "next/image";
import { DialogTitle } from "@radix-ui/react-dialog";
import toast from "react-hot-toast";
import { useGlobalStore } from "@/store/globalStore";

interface PostDialogBoxProps {
  userId: string;
}

export const PostDialogBox = ({ userId }: PostDialogBoxProps) => {
  const [content, setContent] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [video, setVideo] = useState<File | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const setUploadingPost = useGlobalStore((state) => state.setUploadingPost);
const clearUploadingPost = useGlobalStore((state) => state.clearUploadingPost);

  const imageUrls = useMemo(() => {
    return images.map(file => URL.createObjectURL(file));
  }, [images]);
  const videoUrl = useMemo(() => video ? URL.createObjectURL(video) : null, [video]);

  useEffect(() => {
    return () => {
      imageUrls.forEach(url => URL.revokeObjectURL(url));
    };
  }, [imageUrls]);

  useEffect(() => {
    return () => {
      if (videoUrl) URL.revokeObjectURL(videoUrl);
    };
  }, [videoUrl]);

  const closeDialog = useDialogStore.getState().closeDialog;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'image' | 'video') => {
    const files = e.target.files;
    if (!files) return;

    if (type === 'image') {
      if (video) {
        toast.error("Remove the video before uploading images.");
        return;
      }
       if (images.length >= 4) {
          toast.error("You can upload up to 4 images only.");
            return;
        }
      setImages(prev => {
        const newImages = [...prev, ...Array.from(files)].slice(0, 4);
        return newImages;
      });
    } else {
      if (images.length) {
        toast.error("Remove all images before uploading a video.");
        return;
      }
      setVideo(files[0]);
    }
  };

  const handleRemoveVideo = () => {
    setVideo(null);
  };

  const handleSubmit = async () => {
    setUploadingPost({ status: 'pending', message: 'Uploading your post...' });
  closeDialog();

    try {
      setLoading(true);
     
      let uploadedImages: string[] = [];
      let uploadedVideo: string | undefined = undefined;

        if (!content && !images.length && !video) {
            // toast.error("Content or media is required to create a post.");
            setUploadingPost({ status: 'error', message: 'Content or media is required.' });
            setTimeout(() => clearUploadingPost(), 4000);
            return;
        }

      if (images.length) {
        uploadedImages = await Promise.all(images.map(async (file) => {
          const form = new FormData();
          form.append("file", file);
          const res = await fetch("/api/upload", {
            method: "POST",
            body: form,
          });
          if (!res.ok) {
            // toast.error("Image upload failed.");
            setUploadingPost({ status: 'error', message: 'Image upload failed.' });
            setTimeout(() => clearUploadingPost(), 4000);
            return;
          }
          const data = await res.json();
          return data.secure_url;
        }));
      } else if (video) {
        const form = new FormData();
        form.append("file", video);
        const res = await fetch("/api/upload", {
          method: "POST",
          body: form,
        });
        if (!res.ok) {
        setUploadingPost({ status: 'error', message: 'Video upload failed.' });
            setTimeout(() => clearUploadingPost(), 4000);
          return;
        }
        const data = await res.json();
        uploadedVideo = data.secure_url;
      }

      const res = await fetch("/api/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          authorId: userId,
          content,
          images: uploadedImages,
          video: uploadedVideo,
        }),
      });
      if (!res.ok) {
        setUploadingPost({ status: 'error', message: 'Post creation failed.' });
        setTimeout(() => clearUploadingPost(), 4000);
        return;
      }
      await res.json();
      // console.log("Post created:", data.post);
      setContent("");
      closeDialog();
      setUploadingPost({ status: 'success', message: 'Post uploaded successfully!' });
      setTimeout(() => clearUploadingPost(), 2000); 
    } catch (err) {
        const ErrMessage = err instanceof Error ? err.message : 'An error occurred while uploading the post.';
      setUploadingPost({ status: 'error', message: ErrMessage });
      setTimeout(() => clearUploadingPost(), 4000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open onOpenChange={closeDialog}>
      <DialogContent className="dark:bg-backgroundC-dark max-w-xl" aria-describedby={undefined}>
        <DialogTitle className="text-lg font-semibold text-theme">Create a post</DialogTitle>

        <textarea
          value={content}
          onChange={e => setContent(e.target.value)}
          placeholder="What do you want to talk about?"
          className="w-full min-h-[120px] p-3 rounded-md resize-none text-theme bg-muted/50 outline-none"
        />

        {images.length > 0 && (
          <div className="grid grid-cols-2 gap-2 mt-2">
            {images.map((file, i) => (
              <div key={i} className="relative">
                <Image src={imageUrls[i]} className="rounded-md w-full h-36 object-cover" alt={images[i].name} 
                width={300} height={200}
                />
                <button
                  className="absolute top-1 right-1 text-red-500 bg-white rounded-full p-2 cursor-pointer"
                  onClick={() => setImages(images.filter((_, idx) => idx !== i))}
                  type="button"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        )}

        {video && videoUrl && (
          <div className="relative mt-2">
            <video controls src={videoUrl} className="rounded-md w-full" />
            <button
              className="absolute top-1 right-1 text-red-500 bg-white rounded-full p-2  cursor-pointer"
              onClick={handleRemoveVideo}
              type="button"
            >
              <Trash2 size={18} />
            </button>
          </div>
        )}

        <div className="flex justify-between items-center mt-4">
          <div className="flex gap-1 items-center">
            {/* Show image upload only if no video is selected */}
            {video === null && (
              <>
                <label htmlFor="img" className="linkedIn-button-ghost h-full">
                  <ImageIcon />
                </label>
                <input id="img" type="file" accept="image/*" hidden multiple onChange={e => handleFileChange(e, "image")} />
              </>
            )}
            {/* Show video upload only if no images are selected */}
            {images.length === 0 && (
              <>
                <label htmlFor="vid" className="linkedIn-button-ghost h-full">
                  <VideoIcon size={24}/>
                </label>
                <input id="vid" type="file" accept="video/*" hidden onChange={e => handleFileChange(e, "video")} />
              </>
            )}
            {images.length > 0 && (
              <button onClick={() => setEditMode(true)} className="linkedIn-button-ghost h-full" type="button" title="Edit Images">
                <Pencil size={18} />
              </button>
            )}
          </div>

          <button className="linkedIn-button-filled" onClick={handleSubmit} disabled={loading || (!content && !images.length && !video)}>
            {loading ? "Posting..." : "Post"}
          </button>
        </div>

        {editMode && (
          <EditImageDialog
            images={images}
            onClose={() => setEditMode(false)}
            onSave={(updated) => setImages(updated)}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};
