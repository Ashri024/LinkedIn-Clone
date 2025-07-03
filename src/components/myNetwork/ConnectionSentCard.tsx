'use client';

import Image from 'next/image';

export type ConnectionSentCardProps = {
    _id: string;
    name: string;
    headline: string;
    profileImageUrl: string;
    type: 'connect' | 'follow-connect';
};

function ConnectionSentCard({ data }: {data: ConnectionSentCardProps}) {
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
          <p className="font-medium text-sm">{data.name}</p>
          <p className="text-sm text-muted-foreground">{data.headline}</p>
        </div>
      </div>
      <div className="flex gap-2">
        <button className='linkedIn-button-ghost' >Withdraw</button>
      </div>
    </div>
  );
}

export default ConnectionSentCard;
