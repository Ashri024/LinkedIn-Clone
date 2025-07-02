'use client'

import UserInstance from "@/components/myNetwork/UserInstance"
import { followersData } from "@/constants/GlobalConstants"

export default function FollowingPage() {
  return (
    <>
      <p className="text-sm text-muted-foreground mb-4 ">You&apos;re following 0 people</p>
      <div className="space-y-4">
      {followersData.map((follower) => {
      return <UserInstance key={follower._id} follower={follower} />
      })}
      </div>
  </>
  )
}
