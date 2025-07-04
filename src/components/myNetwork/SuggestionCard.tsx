'use client';

import Image from 'next/image';
import DefaultProfile from '@/../public/default-profile.svg';
import { formatProfileURL } from '@/lib/formatProfileURL';
import Link from 'next/link';
// import { FaCheck, FaPlus, FaUserFriends } from 'react-icons/fa';
// import { useState } from 'react';
// import toast from 'react-hot-toast';
import FollowToggleButton from './FollowToggleButton';
import { FaUserFriends } from 'react-icons/fa';

export type SuggestionCardProps = {
    _id: string;
    firstName: string;
    lastName?: string;
    headline?: string;
    profileImageUrl?: string;
    email: string;
};

function SuggestionCard({ data, isFollowing }: {data:SuggestionCardProps, isFollowing: boolean}) {
  

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
            <button className="absolute -top-2 right-0 text-xl text-gray-400">x</button>
          </div>
          <div className="text-center">
            <p className="font-medium w-full">{data.firstName+" "+data.lastName}</p>
            <p className="text-muted-foreground text-sm line-clamp-2">{data.headline}</p>
          </div>
        </div>
      <div className='flex flex-col gap-2'>
      <button className="w-full text-sm linkedIn-button-filled flex items-center justify-center gap-2">
        <FaUserFriends size={18} />
        Connect</button>
        {/* <button className={`w-full text-sm ${isFollowingState?"linkedIn-button-outline2":"linkedIn-button-outline"} flex items-center justify-center gap-1`}
        onClick={(e)=>{
          e.stopPropagation();
          e.preventDefault();
          toggleFollow();
        }}
        disabled={loading}
        >
          {isFollowingState ?<FaCheck size={14} /> : <FaPlus size={14} />}
        
        {isFollowingState ? 'Following' : 'Follow'}
        </button> */}
        <FollowToggleButton isFollowing={isFollowing} userViewedId={data._id} className='w-full text-sm' />
      </div>
    </Link>
  );
}

export default SuggestionCard;
