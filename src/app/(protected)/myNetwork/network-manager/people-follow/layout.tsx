// app/mynetwork/network-manager/people-follow/layout.tsx

// import { PeopleFollowProvider } from '@/app/providers/PeopleFollowContext'
import Container from '@/components/Container'
import FollowersLinkSection from '@/components/myNetwork/followers/FollowersLinkSection'
import TabLink from '@/components/TabLink'
import { authOptions } from '@/lib/authOptions'
// import { getFollowers, getFollowing } from '@/lib/db/backend/follower'
import { getServerSession } from 'next-auth'
import React from 'react'
// export type FollowSchema = {
//   _id: string;
//   firstName: string;
//   lastName: string;
//   headline: string;
//   profileImageUrl: string;
// };
export default async function PeopleFollowLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions)
  const basePath = '/myNetwork/network-manager/people-follow'

  return (
      <Container>
        <div className="flex-1 h-fit bg-white dark:bg-backgroundC-dark rounded-md p-4 ">
          {/* Header */}
          <h2 className="text-lg font-semibold text-theme-secondary pb-2 border-b mb-4">
            {session?.user?.firstName}&apos;s Network
          </h2>

          {/* Tab Links */}
          <div className="flex border-b mb-4 space-x-6 text-sm font-medium">
            <TabLink href={`${basePath}/following`} text="Following" />
            <TabLink href={`${basePath}/followers`} text="Followers" />
          </div>

          {children}
        </div>
        <FollowersLinkSection />
      </Container>
  )
}


