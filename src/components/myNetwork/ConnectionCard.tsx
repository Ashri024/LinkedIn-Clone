'use client';

import { useDialogStore } from '@/store/dialogStore';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { BsThreeDots } from 'react-icons/bs';
import Image from 'next/image';
import { RemoveConnectionDialog } from './RemoveConnectionDialog'; // Dialog Component
import { RiDeleteBin6Fill } from "react-icons/ri";

export type ConnectionCardProps = {
    _id: string;
    name: string;
    headline: string;
    profileImageUrl: string;
    connectedDate?: Date;
};
function ConnectionCard({ data }: { data: ConnectionCardProps }) {
  const handleRemove = () => {
    useDialogStore.getState().openDialog(
      <RemoveConnectionDialog userId={data._id} userName={data.name} />
    );
  };

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
          <p><span className='font-semibold'>{data.name}</span></p>
          <p className="text-sm text-muted-foreground">{data.headline}</p>
          {data.connectedDate && (
            <p className="text-xs text-muted-foreground">
              Connected on {new Date(data.connectedDate).toLocaleDateString()}
            </p>
          )}
        </div>
      </div>
      <div className="flex gap-4 px-4">
        <button className='linkedIn-button-outline'>Message</button>

        {/* Dropdown trigger */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className='linkedIn-button-ghost'><BsThreeDots /></button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={handleRemove} className='dark:text-white/80 cursor-pointer'>
              <RiDeleteBin6Fill size={24} className='dark:text-white/80 text-black' />
              Remove connection
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

export default ConnectionCard;
