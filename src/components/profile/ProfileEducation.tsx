'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Pencil, Plus } from 'lucide-react';
import Image from 'next/image';

export const ProfileEducation = () => {
  return (
    <Card className="dark:bg-backgroundC-dark border-0">
      <CardHeader className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-theme">Education</h2>
        <div className="flex gap-2">
          <Plus className="w-4 h-4 text-muted-foreground cursor-pointer" />
          <Pencil className="w-4 h-4 text-muted-foreground cursor-pointer" />
        </div>
      </CardHeader>
      <CardContent className="text-theme text-sm flex gap-4">
         <Image
            src="https://media.licdn.com/dms/image/v2/C510BAQHGCXHybaxsYA/company-logo_100_100/company-logo_100_100/0/1630616349300?e=1756339200&v=beta&t=pbJ6HHjKuLrKdXKcqz7cpqiYUzGg2kfhj-tY6i7_saE"
            alt="Company Logo"
            width={50}
            height={40}
            className="rounded overflow-hidden h-[50px] object-contain"
          />
        <div>
          <p className="font-semibold">Manipal University Jaipur</p>
          <p className="text-white/80 text-sm">
            BCA, Computer Technology/Computer Systems Technology
          </p>
          <p className="text-muted-foreground text-sm">Oct 2022 – Oct 2025</p>
        </div>
      </CardContent>
    </Card>
  );
};
