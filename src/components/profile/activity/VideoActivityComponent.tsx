'use client';
import Link from 'next/link';

function VideoActivityComponent({ userId }: { userId: string }) {


  return (
    <div className="relative w-full flex flex-col justify-between mb-2">
    <div>No videos yet.</div>
    <div className="flex items-center justify-center mt-4">
      <Link href={`/profile/${userId}/recent-activities/videos`} className="linkedIn-link">Show all videos →</Link>
    </div>
  </div>
  );
}

export default VideoActivityComponent;