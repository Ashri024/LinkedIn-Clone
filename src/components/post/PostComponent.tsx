"use client"
import React, { useEffect, useRef, useState } from 'react'
import { PostCard, PostCardProps } from '@/components/feed/PostCard';
import { PostInput } from '../feed/PostInput';
import { UploadingProgress } from '@/components/post/UploadingProgress';
import SmallLoader from '../SmallLoader';

function PostComponent() {
    const [posts, setPosts] = useState<PostCardProps[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const loader = useRef<HTMLDivElement | null>(null);
    const [loading, setLoading] = useState(true);
    const fetchingRef = useRef(false);

    // Infinite scroll
    useEffect(() => {
      if (!hasMore || loading) return;
      const observer = new IntersectionObserver(
        entries => {
          if (entries[0].isIntersecting && hasMore && !loading && !fetchingRef.current) {
            fetchingRef.current = true;
            setPage(prev => prev + 1);
          }
        },
        { threshold: 1 }
      );
      if (loader.current) observer.observe(loader.current);
      return () => observer.disconnect();
    }, [hasMore, loading]);

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            try {
              const res = await fetch(`/api/post?page=${page}`);
              if (!res.ok) {
                  throw new Error('Failed to fetch posts');
              }
              const data = await res.json();
              // console.log('Fetched posts:', data);
              if (data.length < 5) setHasMore(false);
              setPosts(prev => {
                const ids = new Set(prev.map(p => p._id));
                const filtered = data.filter((p:PostCardProps) => !ids.has(p._id));
                return [...prev, ...filtered];
              });
            } catch (err) {
              console.error(err);
            } finally{
                setLoading(false);
                fetchingRef.current = false;
            }
          };
      fetchPosts();
    }, [page]); 

    return (
      <section className="flex-1 w-full mx-auto flex flex-col gap-2">
          <UploadingProgress />
          <PostInput />
          {posts.map(post => (
            <PostCard key={post._id} post={post} />
          ))}
          {loading && (
            <div className="flex items-center justify-center h-12  relative">
              <SmallLoader loading={loading} size={"30px"} borderSize='4px'/>
            </div>
          )}
          <div ref={loader} className="h-1"/>
      </section>
    )
}

export default PostComponent