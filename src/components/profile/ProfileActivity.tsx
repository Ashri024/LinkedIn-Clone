'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import Link from 'next/link';
import { PostActivityComponent } from './activity/PostActivityComponent';
import CommentActivityComponent from './activity/CommentActivityComponent';
import VideoActivityComponent from './activity/VideoActivityComponent';
import ImageActivityComponent from './activity/ImageActivityComponent';
import { useSession } from 'next-auth/react';

const activityTabs = [
  { label: 'Posts', value: 'posts' },
  { label: 'Comments', value: 'comments' },
  { label: 'Videos', value: 'videos' },
  { label: 'Images', value: 'images' },
];


export const ProfileActivity = () => {
  const [selected, setSelected] = useState('posts');
  const {data:session} = useSession();
  if (!session?.user || !session?.user?._id) return null;

  return (
    <Card className="dark:bg-backgroundC-dark border-0">
      <CardHeader className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold text-theme">Activity</h2>
          <Link href="#" className="text-sm linkedIn-link font-semibold">1,668 followers</Link>
        </div>
        <Button variant="outline" className="rounded-full text-sm  px-4 py-2 link-button">
          Create a post
        </Button>
      </CardHeader>

      <CardContent className='pb-0'>
        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-4">
        {activityTabs.map(tab => (
          <button
            key={tab.value}
            onClick={() => setSelected(tab.value)}
            className={`rounded-full text-base font-semibold py-1 px-3 cursor-pointer  border border-muted-foreground dark:border-white/20  ${selected === tab.value ? 'bg-[#01754f] hover:bg-[#056143] dark:bg-[#37C898] dark:hover:bg-[#74E5C0] text-white dark:text-backgroundC-dark ' : 'bg-transparent text-muted-foreground hover:text-black hover:bg-black/10 dark:hover:bg-white/10 dark:hover:text-white'}`}
          >
            {tab.label}
          </button>
        ))}
        </div>

        {/* Posts */}
        <div>
        {selected === 'posts' && <PostActivityComponent userId={session?.user?._id} />}
        {selected === 'comments' && <CommentActivityComponent userId={session?.user?._id} />}
        {selected === 'videos' && <VideoActivityComponent userId={session?.user?._id} />}
        {selected === 'images' && <ImageActivityComponent userId={session?.user?._id} />}
      </div>
      </CardContent>
    </Card>
  );
};
