// src/app/(protected)/feed/page.tsx
'use client';

import { useSession } from 'next-auth/react';
import { FeedSidebar } from '@/components/feed/Sidebar';
import { PostInput } from '@/components/feed/PostInput';
import { PostCard } from '@/components/feed/PostCard';
import { NewsPanel } from '@/components/feed/NewsPanel';
import { postsData } from '@/data/feed/postsData';

export default function FeedPage() {
  const { data: session } = useSession();

  return (
    <main className="background-theme text-theme min-h-screen px-2 sm:px-4 md:px-6 lg:px-10 py-4 flex flex-col gap-6">
      <div className="w-full flex flex-col md:flex-row gap-4 max-w-[1200px] mx-auto">
        {/* Left Sidebar */}
        <aside className="hidden md:block w-full max-w-[250px]">
        {/* <aside className="block lg:block w-full max-w-xs"> */}
          <FeedSidebar user={session?.user} />
        </aside>

        {/* Main Feed */}
        <section className="flex-1 w-full mx-auto flex flex-col gap-4">
        {/* <section className="flex-1 w-full max-w-[640px] mx-auto flex-col gap-4 hidden"> */}
          <PostInput />
          {postsData.map(post => (
            <PostCard key={post.id} {...post} />
          ))}
        </section>

        {/* Right News Panel */}
        <aside className="hidden lg:block w-full max-w-[300px]">
          <NewsPanel />
        </aside>
      </div>
    </main>
  );
}
