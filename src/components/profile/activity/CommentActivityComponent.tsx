'use client';
import Link from 'next/link';

function CommentActivityComponent({ userId }: { userId: string }) {
  // You can fetch comments from `/api/comments/${userId}` if you have such an endpoint
  // For now, just a placeholder
  return (
    <div className="relative w-full flex flex-col justify-between mb-2">
      <div>No comments yet.</div>
      <div className="flex items-center justify-center mt-4">
        <Link href={`/profile/${userId}/recent-activities/comments`} className="linkedIn-link">Show all comments →</Link>
      </div>
    </div>
  );
}

export default CommentActivityComponent;