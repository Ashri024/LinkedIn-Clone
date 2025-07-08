// src/components/post/ImagePreviewDialog.tsx
'use client';
import Image from 'next/image';

export function ImagePreviewDialog({ src, alt }: { src: string; alt?: string }) {
  return (
    <div className="flex flex-col items-center justify-center p-0">
      <Image
        src={src}
        alt={alt || 'Preview'}
        width={800}
        height={600}
        className="max-w-full max-h-[80vh] rounded-lg object-contain"
        style={{ background: '#222' }}
      />
    </div>
  );
}