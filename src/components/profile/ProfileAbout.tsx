'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Pencil } from 'lucide-react';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { IoDiamondOutline } from "react-icons/io5";
import { FaArrowRight } from "react-icons/fa6";
export const ProfileAbout = () => {
  const [expanded, setExpanded] = useState(false);

  const aboutText = `Hi! I'm Ashri, a MERN stack developer and UI/UX designer with experience in Next.js, TypeScript, React Native, Redux, and Socket.io. I enjoy building web and mobile apps that are user-friendly and solve real-world problems.

I'm currently exploring more web technologies to expand my skills and stay updated with the latest trends in development.`;

  const skills = ['UI ux', 'MERN', 'Next.js', 'React Native', 'TypeScript'];

  return (
    <Card className="w-full dark:bg-backgroundC-dark border-0 gap-4">
      <CardHeader className="flex flex-row justify-between items-center">
        <h2 className="text-lg font-semibold text-theme">About</h2>
        <button className="text-muted-foreground hover:text-primary">
          <Pencil size={16} />
        </button>
      </CardHeader>

      <CardContent className="text-sm text-theme leading-relaxed space-y-4">
        <div>
          <p className={expanded ? '' : 'line-clamp-3'}>{aboutText}</p>

          {!expanded ? (
            <div
              className="mt-2 text-sm text-blue-500 cursor-pointer select-none"
              onClick={() => setExpanded(true)}
            >
              ...see more
            </div>
          ) : (
            <div
              className="mt-2 text-sm text-blue-500 cursor-pointer select-none"
              onClick={() => setExpanded(false)}
            >
              see less
            </div>
          )}
        </div>

        <div className=" rounded-md p-2 px-4 border border-white/20 flex gap-2">
          <IoDiamondOutline size={20} className="mt-1" />
          <div className='flex flex-col gap-0'>
            <h4 className="font-medium text-theme flex items-center gap-2 text-base">
              Top skills
            </h4>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <div key={skill} className="flex items-center gap-1">
                  <Badge
                    variant="secondary"
                    className=" bg-transparent px-0 py-1 rounded-full text-sm font-normal"
                  >
                    {skill} 
                  </Badge>
                  {/* // if not the last element then "•" */}
                  <span key={skill} className="text-muted-foreground">
                    {skills.indexOf(skill) < skills.length - 1 ? ' • ' : ''}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="ml-auto flex items-center gap-2 text-white">
            <FaArrowRight size={16}  />
            </div>
        </div>
      </CardContent>
    </Card>
  );
};
