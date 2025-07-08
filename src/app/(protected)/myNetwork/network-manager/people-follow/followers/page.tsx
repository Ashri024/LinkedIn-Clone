"use client";
import { usePeopleFollow } from '@/app/providers/PeopleFollowContext';
import UserInstance from '@/components/myNetwork/UserInstance';
import NoContentCard from '@/components/myNetwork/NoContentCard';

export default function FollowersPage() {
  const {followers, followingIds} = usePeopleFollow();

  return <>
    {followers.length >0 ?
    <>
      <p className="text-sm text-muted-foreground mb-4">{followers.length} people are following you</p>

      <div className="space-y-4">
        {followers.map((follower) => {
         return <UserInstance key={follower._id} follower={follower} isFollowing={
          followingIds?.includes(follower._id.toString())
         } />
        })}
      </div>
    </>
   : (
    <NoContentCard text="You have no followers yet." />
  )}
  </>
}

