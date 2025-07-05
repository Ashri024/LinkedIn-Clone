'use client';

import Image from 'next/image';
import DefaultProfile from '@/../public/default-profile.svg';
import { formatProfileURL } from '@/lib/formatProfileURL';
import Link from 'next/link';
import FollowToggleButton from './FollowToggleButton';
import ConnectionToggleButton from './ConnectionToggleButton';
import { ConnectionStatus } from '@/models/Connection';

export type SuggestionCardProps = {
    _id: string;
    firstName: string;
    lastName?: string;
    headline?: string;
    profileImageUrl?: string;
    email: string;
};

function SuggestionCard({ data, isFollowing, connected }: {data:SuggestionCardProps, isFollowing: boolean, connected?: ConnectionStatus}) {
  

  return (
    <Link href={
      `/profile/${formatProfileURL(
        data.firstName,
        data.lastName || '',
        data._id
      )}`} className=" flex-shrink-0 border rounded-md p-3 dark:bg-backgroundC-dark cursor-pointer h-[300px] xl:h-[270px] justify-between flex flex-col">
        <div>
          <div className="relative flex justify-center">
            <Image
              src={data.profileImageUrl || DefaultProfile}
              alt={`${data.firstName}'s profile`}
              width={90}
              height={90}
              className="rounded-full object-cover mb-2"
            />
            {/* <button className="absolute -top-2 right-0 text-xl text-gray-400">x</button> */}
          </div>
          <div className="text-center">
            <p className="font-medium w-full">{data.firstName+" "+data.lastName}</p>
            <p className="text-muted-foreground text-sm line-clamp-2">{data.headline}</p>
          </div>
        </div>
      <div className='flex flex-col gap-2'>
        <ConnectionToggleButton className='w-full text-sm' connected={connected} receiverId={data._id}/>
        <FollowToggleButton isFollowing={isFollowing} userViewedId={data._id} className='w-full text-sm' />
      </div>
    </Link>
  );
}

export default SuggestionCard;
