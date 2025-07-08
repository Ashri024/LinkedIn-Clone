'use client';
import { useEffect, useState } from 'react';
import { PostCardProps } from '@/components/feed/PostCard';
import Link from 'next/link';
import { ChevronLeft, ChevronRight,  } from 'lucide-react';
import PostActivityCard from './PostActivityCard';
// import { PostImageGallery } from '@/components/post/PostImageGallery';


export function PostActivityComponent({ userId }: { userId: string }) {
  const [posts, setPosts] = useState<PostCardProps[]>([]);
  const [startIdx, setStartIdx] = useState(0);
  const [visibleCount, setVisibleCount] = useState(2);

  useEffect(() => {
    fetch(`/api/post/${userId}`)
      .then(res => res.json())
      .then(setPosts);
  }, [userId]);

  // Responsive: 2 on desktop, 1 on mobile
  useEffect(() => {
    const updateVisibleCount = () => {
    //   setVisibleCount(window.innerWidth < 1024 ? 1 : 2);
    if(window.innerWidth >1024) {
        // console.log("Setting visible count to 2 for desktop");
      setVisibleCount(2);
    }
    else if(window.innerWidth > 768 && window.innerWidth <= 1024) {
        // console.log("Setting visible count to 1 for tablet");
        setVisibleCount(1);
    }
    else if(window.innerWidth > 640 && window.innerWidth <= 768) {
        // console.log("Setting visible count to 1 for large mobile");
        setVisibleCount(2);
    } else{
        // console.log("Setting visible count to 1 for mobile");
        setVisibleCount(1);
    }
    };
    updateVisibleCount();
    window.addEventListener('resize', updateVisibleCount);
    return () => window.removeEventListener('resize', updateVisibleCount);
  }, []);

//   useEffect(() => {
//     console.log('Posts fetched:', posts);
//   }, [posts]);
useEffect(() => {
    // console.log("Visible count updated:", visibleCount);
    }, [visibleCount]);
  if (!posts.length) return <div>No posts yet.</div>;

  const endIdx = Math.min(startIdx + visibleCount, posts.length);

  const handlePrev = () => setStartIdx(idx => Math.max(0, idx - 1));
  const handleNext = () => setStartIdx(idx => Math.min(posts.length - visibleCount, idx + 1));
  return (
    <div className="relative w-full">
      <div className="flex items-center gap-2 relative">
        <button
          onClick={handlePrev}
          className="p-2 rounded-full bg-muted cursor-pointer hover:opacity-80 disabled:opacity-50 absolute left-0 z-10 
          top-1/2 flex-center disabled:hover:bg-muted/50 disabled:cursor-not-allowed disabled:hover:opacity-100
          "
          aria-label="Previous"
          disabled={startIdx === 0}
        >
          <ChevronLeft />
        </button>
        <div className="flex gap-4 flex-1 overflow-x-hidden ">
          {posts.slice(startIdx, endIdx).map(post => (
          <PostActivityCard key={post._id} post={post} />
          ))}
        </div>
        <button
          onClick={handleNext}
          className="p-2 rounded-full bg-muted cursor-pointer hover:opacity-80 disabled:opacity-50 
            absolute right-0 z-10 top-1/2 flex-center disabled:hover:bg-muted/50 disabled:cursor-not-allowed disabled:hover:opacity-100
          "
          aria-label="Next"
          disabled={endIdx >= posts.length}
        >
          <ChevronRight />
        </button>
      </div>
      <div className="flex items-center justify-center mt-4">
        <Link href={`/profile/${userId}/recent-activities/comments`} className="linkedIn-link">Show all posts →</Link>
      </div>
    </div>
  );
}