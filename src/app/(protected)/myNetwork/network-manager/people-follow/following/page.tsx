"use client";
import { usePeopleFollow } from "@/app/providers/PeopleFollowContext";
import NoContentCard from "@/components/myNetwork/NoContentCard";
import UserInstance from "@/components/myNetwork/UserInstance"

export default  function FollowingPage() {
  const {following, followingIds} = usePeopleFollow();
  return (
    <>
    {following.length > 0 ? 
      <>
      <p className="text-sm text-muted-foreground mb-4 ">You&apos;re following {following.length} people</p>
      <div className="space-y-4">
      {following.map((follower) => {
      return <UserInstance key={follower._id} follower={follower} isFollowing={
        followingIds?.includes(follower._id.toString())
      } />
      })}
      </div>
      </>
      : (
        <NoContentCard text="You are not following anyone yet." />
      )}
  </>
  )
}
