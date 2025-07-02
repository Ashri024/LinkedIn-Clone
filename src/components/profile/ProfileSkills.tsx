'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Pencil, Plus } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

const skills = ['TypeScript', 'UI ux', 'MERN', 'Next.js', 'React Native', 'Version Control', 'DOM', 'JSON', 'REST APIs', 'Mongoose ODM'];

export const ProfileSkills = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card className="dark:bg-backgroundC-dark border-0">
      <CardHeader className="flex justify-between items-center text-theme">
        <h2 className="text-lg font-semibold">Skills</h2>
        <div className="flex items-center gap-3">
          <Plus size={18} className="cursor-pointer" />
          <Pencil size={18} className="cursor-pointer" />
        </div>
      </CardHeader>
      <CardContent className="text-theme">
        {/* Desktop */}
        <div className="hidden md:block space-y-3">
          <div className='border-b pb-4 border-b-white/15'>
            <p className="font-semibold">TypeScript</p>
            <div className='flex items-center gap-2 mt-3'>
                <Image 
                    src="https://media.licdn.com/dms/image/v2/D560BAQGDpStDGI42BQ/img-crop_100/B56ZbLYUFEH4Ac-/0/1747168872257?e=1756339200&v=beta&t=EE2GPnFo7wWGVbsVivO05Rf2HD3W6eEBG9PqoAZr-2g"
                    alt="TypeScript Logo"
                    width={30}
                    height={20}
                    className="rounded overflow-hidden h-[30px] object-contain"
                    />
                <p className="text-sm ">2 experiences at The RD Group Of Industries</p>
            </div>
          </div>
          <div className='border-b pb-4 border-b-white/15'>
            <p className="font-semibold">TypeScript</p>
            <div className='flex items-center gap-2 mt-3'>
                <Image 
                    src="https://media.licdn.com/dms/image/v2/D560BAQGDpStDGI42BQ/img-crop_100/B56ZbLYUFEH4Ac-/0/1747168872257?e=1756339200&v=beta&t=EE2GPnFo7wWGVbsVivO05Rf2HD3W6eEBG9PqoAZr-2g"
                    alt="TypeScript Logo"
                    width={30}
                    height={20}
                    className="rounded overflow-hidden h-[30px] object-contain"
                    />
                <p className="text-sm ">2 experiences at The RD Group Of Industries</p>
            </div>
          </div>
          <div className='border-b pb-4 border-b-white/15'>
            <p className="font-semibold">TypeScript</p>
            {/* <div className='flex items-center gap-2 mt-3'>
                <p className="text-sm ">2 experiences at The RD Group Of Industries</p>
            </div> */}
          </div>
          <div className="text-blue-500 text-sm mt-4 cursor-pointer text-center">Show all 29 skills →</div>
        </div>

        {/* Mobile */}
        <div className="md:hidden flex flex-wrap gap-2 text-sm text-muted-foreground">
          {(expanded ? skills : skills.slice(0, 6)).map(skill => (
            <span key={skill} className="border px-2 py-1 rounded-full bg-muted/10 text-theme">{skill}</span>
          ))}
          <button onClick={() => setExpanded(prev => !prev)} className="w-full text-left text-blue-500 text-sm mt-2">
            {expanded ? 'See less' : 'See more'}
          </button>
        </div>
      </CardContent>
    </Card>
  );
};
