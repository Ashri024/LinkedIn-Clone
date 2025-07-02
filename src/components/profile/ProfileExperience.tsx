'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Pencil, Plus } from 'lucide-react';
import Image from 'next/image';
import { MdOutlineDiamond } from "react-icons/md";

export const ProfileExperience = () => {
  return (
    <Card className="dark:bg-backgroundC-dark border-0">
      <CardHeader className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-theme">Experience</h2>
        <div className="flex gap-2">
          <Plus className="w-4 h-4 text-muted-foreground cursor-pointer" />
          <Pencil className="w-4 h-4 text-muted-foreground cursor-pointer" />
        </div>
      </CardHeader>
      <CardContent className="space-y-6 text-theme text-sm">
        <div className="flex gap-4">
          <Image
            src="https://media.licdn.com/dms/image/v2/D560BAQGDpStDGI42BQ/img-crop_100/B56ZbLYUFEH4Ac-/0/1747168872257?e=1756339200&v=beta&t=EE2GPnFo7wWGVbsVivO05Rf2HD3W6eEBG9PqoAZr-2g"
            alt="Company Logo"
            width={50}
            height={40}
            className="rounded overflow-hidden h-[50px] object-contain"
          />
          <div className="flex-1">
            <h3 className="font-semibold text-base">The RD Group Of Industries</h3>
            <p className="text-muted-foreground text-sm">6 mos</p>
            <p className="text-muted-foreground text-sm">Remote</p>

            <div className="border-l-[1.5px] border-muted-foreground/40 ml-2 pl-5 mt-3 flex flex-col gap-6">
              <div>
                <p className="font-semibold text-sm">Full-stack Developer</p>
                <p className="text-muted-foreground text-sm">Full-time</p>
                <p className="text-muted-foreground text-sm">Oct 2024 - Dec 2024 · 3 mos</p>
                <p className="text-white text-sm mt-1 flex items-end gap-1">
                    <MdOutlineDiamond className="inline-block mr-1" size={15}/>
                  <span>UI ux, Next.js and </span>
                  <span className="font-semibold">+3 skills</span>
                </p>
              </div>
              <div>
                <p className="font-semibold text-sm">Full-stack Developer</p>
                <p className="text-muted-foreground text-sm">Internship</p>
                <p className="text-muted-foreground text-sm">Jul 2024 - Oct 2024 · 4 mos</p>
                <p className="text-white text-sm mt-1 flex items-end gap-1">
                  <MdOutlineDiamond className="inline-block mr-1" size={15}/>
                  < span>UI ux, MERN and </span>
                    <span className="font-semibold">+3 skills</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
