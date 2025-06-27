'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Pencil } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export const ProfileSummary = () => {
  return (
    <Card className="w-full overflow-hidden p-0 border-0 dark:bg-backgroundC-dark">
      <div className="relative w-full h-44 bg-gray-400 dark:bg-gray-700">
        <Image
          src="https://media.licdn.com/dms/image/v2/D5616AQHHaQyGxIvB5Q/profile-displaybackgroundimage-shrink_350_1400/profile-displaybackgroundimage-shrink_350_1400/0/1730118201159?e=1756339200&v=beta&t=vS9hOc_4sa0hWn7a7MmqOUwPzTiDHJ96gBh1heFXOas"
          alt="cover"
          fill
          className="object-cover"
        />
        <button className="absolute top-4 right-4 bg-white/70 text-primaryC p-2 rounded-full">
          <Pencil size={16} />
        </button>
      </div>
      <CardContent className="relative -mt-30 flex flex-col gap-4 px-4 sm:px-6 pb-4">
        <button className="absolute top-28 right-4  text-white rounded-full p-2">
          <Pencil size={20} />
        </button>
        <div className='absolute top-36 right-16  flex gap-2 items-center justify-center cursor-pointer'>
          <Image
          src={"https://res.cloudinary.com/djnhadxeb/image/upload/v1750941977/fd48b7fd-3946-4f94-ac18-ef1959568784.png"}
          alt="profile-image"
          width={30}
          height={30}
        />  
          <p className='text-xs text-white'>Manipal University Jaipur</p>
        </div>

        <div className="flex flex-col gap-2">
          <Image
            src="https://media.licdn.com/dms/image/v2/D5635AQFfo6xZPePVow/profile-framedphoto-shrink_400_400/profile-framedphoto-shrink_400_400/0/1730116977711?e=1751551200&v=beta&t=t_BA8XOjNfFNmv459eBcylSZpRf6jpXDY13guX8mh1k"
            alt="avatar"
            width={140}
            height={140}
            className="rounded-full border-4 border-backgroundC-dark"
          />
          <div className="text-theme mt-3 sm:mt-0 space-y-1">
            <h1 className="text-xl font-semibold">Ashri Mallick</h1>
            <p className="text-sm text-white/80">
              MERN stack developer | UI/UX Designer | React Native | Next.js
            </p>
            <p className="text-sm text-white/80">
              Prayagraj, Uttar Pradesh · <span className="linkedIn-link">Contact info</span>
            </p>
            <div className='flex gap-2'>
              <Link href={"/mynetwork/network-manager/people-follow/followers/"} className="text-sm linkedIn-link">1,668 followers</Link>
              <p className="text-sm text-muted-foreground">·</p>
              <Link href={"/mynetwork/invite-connect/connections/"} className="text-sm linkedIn-link">500+ connections</Link>
            </div>
          </div>
        </div>
        <div className="sm:mt-0 flex gap-2">
          <button className="px-3 py-1 text-sm rounded-full text-backgroundC-dark font-semibold bg-linkC border-0 hover:bg-linkC-hover cursor-pointer transition duration-300">Open to</button>
          <button className="px-3 py-1 text-sm rounded-full   cursor-pointer link-button">Add profile section</button>
          <button className="px-3 py-1 text-sm rounded-full link-button cursor-pointer">Enhance profile</button>
          <button className="px-3 py-1 text-sm rounded-full border border-muted-foreground text-muted-foreground hover:border-white hover:bg-white hover:text-backgroundC-dark cursor-pointer transition duration-300">Resources</button>
        </div>
        <div className='w-1/2 p-3 bg-[#38434F] rounded-md relative'>
          <h3 className='text-white text-sm font-semibold'>Open to work</h3>
          <p className='text-white text-sm line-clamp-1 mt-1'>Full Stack developer, User experience design... and idk what more</p>
          <p className='text-sm linkedIn-link'>Show details</p>
          <button className="absolute top-1 right-1   text-white rounded-full p-2">
            <Pencil size={14} />
          </button>
        </div>
      </CardContent>
    </Card>
  );
};
