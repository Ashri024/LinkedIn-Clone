'use client';

import ConnectionToggleButton from '@/components/myNetwork/ConnectionToggleButton';
import FollowToggleButton from '@/components/myNetwork/FollowToggleButton';
import { Pencil } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

function ProfileOptions({ isOwner, userId }: { isOwner: boolean; userId?: string }) {
  const [connectionState, setConnectionState] = useState<'pending' | 'accepted' | undefined>(undefined);
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchConnectionState() {
      if (!userId) return;
      const res = await fetch(`/api/connection/${userId}`, { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        setConnectionState(data.status);
      }
    }

    async function fetchFollowingState() {
      if (!userId) return;
      const res = await fetch(`/api/follow/${userId}`, { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        setIsFollowing(data.isFollowing);
      }
    }

    if (!isOwner) {
      setLoading(true);
      Promise.all([fetchConnectionState(), fetchFollowingState()])
        .finally(() => setLoading(false));
    }
  }, [userId, isOwner]);

  if (!userId) return null;

  return (
    <>
      {isOwner ? (
        <>
          {/* Owner Actions */}
          <div className="sm:mt-0 flex gap-2">
            <button className="text-sm linkedIn-button-filled">Open to</button>
            <button className="text-sm linkedIn-button-outline">Add profile section</button>
            <button className="text-sm linkedIn-button-outline">Enhance profile</button>
            <button className="px-3 py-1 text-sm rounded-full linkedIn-button-white">Resources</button>
          </div>
          <div className="w-1/2 p-3 bg-[#DDE7F1] dark:bg-[#38434F] rounded-md relative">
            <h3 className="text-sm font-semibold">Open to work</h3>
            <p className="text-sm line-clamp-1 mt-1">Full Stack developer, User experience design... and idk what more</p>
            <p className="text-sm linkedIn-link">Show details</p>
            <button className="absolute top-1 right-1 rounded-full p-2">
              <Pencil size={14} />
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="sm:mt-0 flex gap-2 items-center">
            {loading ? (
              <>
                <Skeleton className="h-7 w-[120px] rounded-full" />
                <Skeleton className="h-7 w-[120px] rounded-full" />
                <Skeleton className="h-7 w-[100px] rounded-full" />
                <Skeleton className="h-7 w-[90px] rounded-full" />
              </>
            ) : (
              <>
                <ConnectionToggleButton receiverId={userId} connected={connectionState} className='text-sm' />
                <FollowToggleButton userViewedId={userId} isFollowing={isFollowing} className='text-sm' />
                <button className="text-sm linkedIn-button-outline">Message</button>
                <button className="text-sm linkedIn-button-outline2">More</button>
              </>
            )}
          </div>
        </>
      )}
    </>
  );
}

export default ProfileOptions;
