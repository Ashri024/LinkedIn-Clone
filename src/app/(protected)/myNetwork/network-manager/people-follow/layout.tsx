// app/mynetwork/network-manager/people-follow/layout.tsx

import FollowersLinkSection from '@/components/myNetwork/followers/FollowersLinkSection'
import TabLink from '@/components/TabLink'
import { authOptions } from '@/lib/authOptions'
import { getServerSession } from 'next-auth'
import React from 'react'

export default async function PeopleFollowLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions)
  const basePath = '/myNetwork/network-manager/people-follow'

  return (
    <div className="background-theme text-theme min-h-screen px-4 py-6">
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row gap-6">
        <div className="flex-1 h-fit dark:bg-backgroundC-dark rounded-md p-4 ">
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
      </div>
    </div>
  )
}


