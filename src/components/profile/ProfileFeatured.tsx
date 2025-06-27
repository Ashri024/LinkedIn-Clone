'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Plus, Pencil } from 'lucide-react';
import Image from 'next/image';

const featuredData = [
  {
    type: 'Post',
    title: 'Hello everyone, Introducing PurrFect ddfd Weather...',
    image: '/images/featured1.png',
    reactions: 107,
    comments: 11,
  },
  {
    type: 'Post',
    title: "Hello connections, dfds  dfsdfsd df ds  asdfdf sdfdf  sdfdf  I'm excited to share my first...",
    image: '/images/featured2.png',
    reactions: 71,
    comments: 14,
  },
  {
    type: 'Post',
    title: 'Just wrapped up my latest project - Analog/Digital Clock...',
    image: '/images/featured3.png',
    reactions: 70,
    comments: 17,
  },
];

export const ProfileFeatured = () => {
  return (
    <Card className="dark:bg-backgroundC-dark border-0">
      <CardHeader className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-theme">Featured</h2>
        <div className="flex items-center gap-2">
          <Plus className="w-4 h-4 text-muted-foreground cursor-pointer" />
          <Pencil className="w-4 h-4 text-muted-foreground cursor-pointer" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-row gap-4 overflow-x-auto">
          {featuredData.map((item, idx) => (
            <div key={idx} className="min-w-[300px] lg:min-w-0 min-[1024px]:max-w-[180px] min-[1200px]:max-w-[250px] w-full bg-muted/10 rounded-md overflow-hidden border border-border shadow-sm">
              <div className="p-3 text-xs text-muted-foreground font-semibold ">{item.type}</div>
              <div className="px-3 mb-2 text-sm text-theme line-clamp-2 overflow-hidden">{item.title}</div>
              <div className="relative h-[250px] md:h-[180px] lg:h-[130px] w-full">
                <Image src={"https://media.licdn.com/dms/image/v2/D4D22AQG8ym2n_kIT6g/feedshare-shrink_800/B4DZewnStmGUAg-/0/1751014782861?e=1753920000&v=beta&t=BWRqIHXaauxqWEiETOEgSdqkqTQqVpbhG0E7Y6MOy2k"} alt="Featured post" fill className=" object-cover" />
              </div>
              <div className="p-3 text-xs text-muted-foreground flex justify-between">
                <span>👍 {item.reactions}</span>
                <span>{item.comments} comments</span>
              </div>
              
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
