'use client'

import Image from 'next/image'
import { useDialogStore } from '@/store/dialogStore';
import { ImagePreviewDialog } from '../ImagePreviewDialog'; // adjust path as needed

export function PostImageGallery({ images }: { images: string[] }) {
  const imgCount = images.length;
  const openDialog = useDialogStore.getState().openDialog;
  if (imgCount === 1) {
    return (
      <div className="mt-3 min-h-[250px] max-h-[500px] overflow-hidden">
        <Image
          src={images[0]}
          alt="post image"
          width={800}
          height={500}
          className="w-full h-auto max-h-[500px] object-cover cursor-pointer"
          onClick={() => openDialog(<ImagePreviewDialog src={images[0]} alt="post image" />)}
        />
      </div>
    );
  }

  if (imgCount === 2) {
    return (
      <div className="mt-3 flex gap-1 h-[300px]">
        {images.map((img, idx) => (
          <div key={idx} className="flex-1 relative overflow-hidden">
            <Image
              src={img}
              alt={`post image ${idx}`}
              fill
                sizes={"(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"}
              className="object-cover cursor-pointer w-full h-full"
               onClick={() => openDialog(<ImagePreviewDialog src={img} alt="post image" />)}
            />
          </div>
        ))}
      </div>
    );
  }

  if (imgCount === 3) {
    return (
      <div className="mt-3 grid grid-cols-2 gap-1 h-[400px]">
        <div className="relative col-span-1 row-span-2 overflow-hidden">
          <Image
            src={images[0]}
            alt="post image 1"
            fill
            className="object-cover cursor-pointer w-full h-full"
             onClick={() => openDialog(<ImagePreviewDialog src={images[0]} alt="post image" />)}
          />
        </div>
        <div className="flex flex-col gap-1">
          {images.slice(1, 3).map((img, idx) => (
            <div key={idx} className="relative h-[195px] overflow-hidden">
              <Image
                src={img}
                alt={`post image ${idx + 2}`}
                fill
                sizes={"(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"}
                className="object-cover cursor-pointer w-full h-full"
                 onClick={() => openDialog(<ImagePreviewDialog src={img} alt="post image" />)}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (imgCount >= 4) {
    return (
      <div className="mt-3 grid grid-cols-2 gap-1 h-[400px]">
        <div className="relative col-span-1 row-span-2 overflow-hidden">
          <Image
            src={images[0]}
            alt="post image 1"
            fill
            sizes={"(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"}
            className="object-cover cursor-pointer w-full h-full"
             onClick={() => openDialog(<ImagePreviewDialog src={images[0]} alt="post image" />)}
          />
        </div>
        <div className="flex flex-col gap-1 h-[400px]">
          {images.slice(1, 4).map((img, idx) => (
            <div key={idx} className="relative h-1/3 overflow-hidden">
              <Image
                src={img}
                alt={`post image ${idx + 2}`}
                fill
                sizes={"(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"}
                className="object-cover cursor-pointer w-full h-full"
                 onClick={() => openDialog(<ImagePreviewDialog src={img} alt="post image" />)}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
}
