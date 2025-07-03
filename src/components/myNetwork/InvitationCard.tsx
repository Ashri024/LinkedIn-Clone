'use client';

import Image from 'next/image';

export type InvitationCardProps = {
    _id: string;
    name: string;
    headline: string;
    follows: boolean;
    profileImageUrl: string;
    type: 'connect' | 'follow-connect';
};

function InvitationCard({ data }: {data: InvitationCardProps}) {
  return (
    <div className="flex items-center justify-between border-b pb-4">
      <div className="flex items-center gap-3">
        <Image
          src={data.profileImageUrl}
          alt={`${data.name}'s profile`}
          width={48}
          height={48}
          className="rounded-full w-[48px] h-[48px] object-cover"
        />
        <div>
          <p className=""><span className='font-semibold'>{data.name}</span>{data.follows && ' follows you and and is inviting you to connect'}</p>
          <p className="text-sm text-muted-foreground">{data.headline}</p>
        </div>
      </div>
      <div className="flex gap-2">
        <button className='linkedIn-button-ghost'>Ignore</button>
        <button className='linkedIn-button-outline'>Accept</button>
      </div>
    </div>
  );
}

export default InvitationCard;
