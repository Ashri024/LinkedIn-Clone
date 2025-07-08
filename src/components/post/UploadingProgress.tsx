// src/components/post/UploadingProgress.tsx
'use client';
import { useGlobalStore } from '@/store/globalStore';
// import { useEffect } from 'react';

export function UploadingProgress() {
  const { uploadingPost } = useGlobalStore();
// useEffect(() => {
//     console.log("uploadingPost statuess:", uploadingPost.status);
//     }, [uploadingPost.status]);
  if (!uploadingPost.status) return null;

  return (
    <div className="bg-backgroundC-dark text-white px-6 py-4 rounded-md shadow-lg flex items-center gap-3 min-w-[300px]">
      {uploadingPost.status === 'pending' && (
        <>
          <span className="loader mr-2" /> {/* You can use a spinner or animation here */}
          <span>{uploadingPost.message || 'Uploading your post...'}</span>
        </>
      )}
      {uploadingPost.status === 'success' && (
        <span className="text-green-400">Post uploaded successfully!</span>
      )}
      {uploadingPost.status === 'error' && (
        <span className="text-red-400">{uploadingPost.message || 'Upload failed.'}</span>
      )}
    </div>
  );
}