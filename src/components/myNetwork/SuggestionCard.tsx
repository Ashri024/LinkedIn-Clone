'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';

type Props = {
  data: {
    _id: string;
    name: string;
    headline: string;
    profileImageUrl: string;
  };
};

function SuggestionCard({ data }: Props) {
  return (
    <div className="w-[220px] flex-shrink-0 border rounded-md p-3 dark:bg-backgroundC-dark">
      <div className="relative flex justify-center">
        <Image
          src={data.profileImageUrl}
          alt={`${data.name}'s profile`}
          width={64}
          height={64}
          className="rounded-full object-cover mb-2"
        />
        <button className="absolute top-0 right-0 text-xl font-bold text-gray-400">x</button>
      </div>
      <div className="text-center">
        <p className="font-medium text-sm">{data.name}</p>
        <p className="text-xs text-muted-foreground line-clamp-2">{data.headline}</p>
      </div>
      <Button size="sm" className="mt-3 w-full text-sm">Connect</Button>
    </div>
  );
}

export default SuggestionCard;
