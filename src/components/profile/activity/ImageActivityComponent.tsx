'use client';
import Link from 'next/link';

function ImageActivityComponent({ userId }: { userId: string }) {

  return (
    <div className="relative w-full flex flex-col justify-between mb-2">
    <div>No images yet.</div>
    <div className="flex items-center justify-center mt-4">
      <Link href={`/profile/${userId}/recent-activities/images`} className="linkedIn-link">Show all images →</Link>
    </div>
  </div>
  );
}

export default ImageActivityComponent;