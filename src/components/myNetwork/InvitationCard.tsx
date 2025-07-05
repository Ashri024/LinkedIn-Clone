// src/components/myNetwork/InvitationCard.tsx
'use client';

import { usePeopleFollow } from '@/app/providers/PeopleFollowContext';
import { formatProfileURL } from '@/lib/formatProfileURL';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

export type InvitationCardProps = {
  _id: string; // sender's id
  firstName: string;
  lastName?: string; // sender's last name
  headline: string;
  profileImageUrl: string;
};

function InvitationCard({ data }: { data: InvitationCardProps }) {
  const [status, setStatus] = useState<'pending' | 'accepted' | 'ignored'>('pending');
  const [loading, setLoading] = useState(false);
  const {followersIds} = usePeopleFollow();
  const followsYou = followersIds?.includes(data._id) || false; // Check if the sender follows you
  const name = `${data.firstName} ${data.lastName || ''}`; // Combine first and last name for display
  const handleAccept = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/connection/accept/${data._id}`, { method: 'POST' });
      if (res.ok) setStatus('accepted');
    } finally {
      setLoading(false);
    }
  };

  const handleIgnore = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/connection/ignore/${data._id}`, { method: 'POST' });
      if (res.ok) setStatus('ignored');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-between border-b pb-4">
      <div className="flex items-center gap-3">
      <Link href={`/profile/${formatProfileURL(data.firstName, data.lastName ||"l", data._id)}`} className='cursor-hover '>
        <Image
          src={data.profileImageUrl}
          alt={`${data.firstName}'s profile`}
          width={48}
          height={48}
          className="rounded-full w-[48px] h-[48px] object-cover"
        />
      </Link>
        <div>
          <p className="">
          <Link href={`/profile/${formatProfileURL(data.firstName, data.lastName || "l", data._id)}`} className='cursor-hover font-semibold hover:underline'>{name}</Link>
            {followsYou && ' follows you and is inviting you to connect'}
          </p>
          <p className="text-sm text-muted-foreground">{data.headline}</p>
        </div>
      </div>
      <div className="flex gap-2">
        {status === 'pending' ? (
          <>
            <button className='linkedIn-button-ghost' onClick={handleIgnore} disabled={loading}>
              {'Ignore'}
            </button>
            <button className='linkedIn-button-outline' onClick={handleAccept} disabled={loading}>
              {'Accept'}
            </button>
          </>
        ) : (
          <span className="text-muted-foreground text-sm">
            {status === 'accepted' ? 'Accepted' : 'Ignored'}
          </span>
        )}
      </div>
    </div>
  );
}

export default InvitationCard;