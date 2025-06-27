'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import Image from 'next/image';
import { ThumbsUp, MoreHorizontal, Repeat2, Send, MessageCircle } from 'lucide-react';
import Link from 'next/link';

const activityTabs = ['Posts', 'Comments', 'Videos', 'Images'];

const activityPosts = [
  {
    image: '/images/activity1.png',
    title: 'Starting a New Position',
    content: `I'm excited to start my new journey as a Full Stack Developer at The Group Of Industries! 🚀 Ready to take on new challenges, build awesom RD Group Of Industries! 🚀 Ready to take on new challenges, build awesome...`,
    caption: 'Starting a New Position',
    reactions: 28,
    comments: 11,
  },
  {
    image: '/images/activity2.png',
    title: 'Internship Completed',
    content: `Yay !!! My First Internship Completed 🎉 Just wrapped up a 3-month paid internship at RD Just wrapped up a 3-month paid internship at RD  dsf dsfds dds sdfds...`,
    caption: 'Internship Certificate',
    reactions: 33,
    comments: 14,
  },
];

export const ProfileActivity = () => {
  const [selected, setSelected] = useState('Posts');

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
            <Button
              key={tab}
              onClick={() => setSelected(tab)}
              variant={'default'}
              className={`rounded-full text-base font-semibold bg-transparent border border-white/20  ${selected === tab ? 'bg-[#37C898] hover:bg-[#74E5C0] text-backgroundC-dark ' : 'text-muted-foreground hover:bg-white/10 hover:text-white'}`}
            >
              {tab}
            </Button>
          ))}
        </div>

        {/* Posts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {activityPosts.map((post, index) => (
            <div key={index} className="bg-backgroundC-dark border border-border rounded-lg shadow-sm">
              {/* Header */}
              <div className="flex items-start justify-between p-3">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-muted shrink-0" />
                  <div className="text-sm">
                    <div className="font-semibold text-theme flex items-center gap-1">
                      Ashri Mallick <span className="text-xs text-muted-foreground">🔘</span>
                      <span className="text-xs text-muted-foreground">• You</span>
                    </div>
                    <div className="text-xs text-muted-foreground">MERN Stack developer | UI/UX Designer • 7mo</div>
                  </div>
                </div>
                <MoreHorizontal className="w-4 h-4 text-muted-foreground cursor-pointer" />
              </div>

              {/* Content */}
              <div className="px-3 text-sm text-theme mb-2 h-15 relative">
                <span className='
                line-clamp-3
                '>{post.content}</span>
                <span className="text-blue-500 cursor-pointer ml-1 absolute bottom-0 right-4 bg-backgroundC-dark">...more</span>
              </div>

              {/* Image */}
              <div className="relative w-full h-48 sm:h-40 md:h-60 overflow-hidden">
                <Image
                  src={"https://media.licdn.com/dms/image/v2/D5622AQGg2aZKwtEzBw/feedshare-shrink_1280/B56Zen7J41GQAo-/0/1750868992921?e=1753920000&v=beta&t=4LDhjnC8mDhLo9lddsjoQ8LXuBefdO_cgxmBKIB63c4"}
                  alt="Post Image"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Caption */}
              <div className="px-3 py-2 text-sm text-theme font-medium">{post.caption}</div>

              {/* Reactions */}
              <div className="px-3 pb-3 flex justify-between text-xs text-muted-foreground">
                <span>👍 {post.reactions} • {post.comments} comments</span>
             
              </div>
              <div className="flex items-center justify-between  text-theme text-sm font-medium border-t border-border p-2">
                <button className="flex-1 py-2 hover:bg-muted rounded-md flex-center gap-2">
                    <ThumbsUp size={16} /> 
                </button>
                <button className="flex-1 py-2 hover:bg-muted rounded-md flex-center gap-2">
                    <MessageCircle size={16} /> 
                </button>
                <button className="flex-1 py-2 hover:bg-muted rounded-md flex-center gap-2">
                    <Repeat2 size={18} /> 
                </button>
                <button className="flex-1 py-2 hover:bg-muted rounded-md flex-center gap-2">
                    <Send size={16} />
                </button>
               </div>
            </div>
          ))}
        </div>

        {/* Footer link */}
        <div className="mt-4 text-center text-muted-foreground font-semibold  cursor-pointer">
          Show all posts →
        </div>
      </CardContent>
    </Card>
  );
};
