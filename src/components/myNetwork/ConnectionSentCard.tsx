// src/components/myNetwork/ConnectionSentCard.tsx
'use client';

import { formatProfileURL } from '@/lib/formatProfileURL';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import DefaultProfile from '@/../public/default-profile.svg'; // Adjust the path as necessary

export type ConnectionSentCardProps = {
  _id: string; // receiver's id
  firstName: string;
  lastName?: string; // receiver's last name
  headline: string;
  profileImageUrl: string;
  followsYou?: boolean;
};

function ConnectionSentCard({ data ,withdrawnS}: { data: ConnectionSentCardProps, withdrawnS?: boolean }) {
  const [withdrawn, setWithdrawn] = useState(withdrawnS || false);
  const [loading, setLoading] = useState(false);
  const name = `${data.firstName} ${data.lastName || ''}`; // Combine first and last name for display

  const handleWithdraw = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/connection/${data._id}`, { method: 'DELETE' });
      if (res.ok) setWithdrawn(true);
    } finally {
      setLoading(false);
    }
  };

  const handleConnect = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/connection/${data._id}`, { method: 'POST' });
      if (res.ok) setWithdrawn(false);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex items-center justify-between border-b pb-4">
      <div className="flex items-center gap-3">
      <Link href={`/profile/${formatProfileURL( data._id, data.firstName, data?.lastName)}`} className='cursor-hover '>
        <Image
          src={data.profileImageUrl || DefaultProfile}
          alt={`${name}'s profile`}
          width={48}
          height={48}
          className="rounded-full w-[48px] h-[48px] object-cover"
        />
      </Link>
        <div>
        <Link href={`/profile/${formatProfileURL(data._id, data.firstName, data?.lastName )}`} className='cursor-hover font-semibold hover:underline'>
          <p className=""><span className='font-semibold'>{name}</span></p>
        </Link>
          <p className="text-sm text-muted-foreground">{data.headline}</p>
        </div>
      </div>
      <div className="flex gap-2">
        {withdrawn ? (
          <button className='linkedIn-button-filled' disabled={loading}
          onClick={handleConnect}
          >
            Connect
          </button>
        ) : (
          <button className='linkedIn-button-outline' onClick={handleWithdraw} disabled={loading}>
           Withdraw
          </button>
        )}
      </div>
    </div>
  );
}

export default ConnectionSentCard;