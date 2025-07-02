'use client';

import UserInstance from '@/components/myNetwork/UserInstance';
import { followersData } from '@/constants/GlobalConstants';


export default function FollowPage() {
  return (
    <>
      <p className="text-sm text-muted-foreground mb-4">{followersData.length} people are following you</p>

      <div className="space-y-4">
        {followersData.map((follower) => {
         return <UserInstance key={follower._id} follower={follower} />
        })}
      </div>
    </>
  );
}

// Create separte component for followers instance
