// app/mynetwork/network-manager/people-follow/layout.tsx

import Container from '@/components/Container'
import FollowersLinkSection from '@/components/myNetwork/followers/FollowersLinkSection'
import TabLink from '@/components/TabLink'
// import { authOptions } from '@/lib/authOptions'
// import { getServerSession } from 'next-auth'
import React from 'react'

export default async function InvitationManagerLayout({ children }: { children: React.ReactNode }) {
//   const session = await getServerSession(authOptions)
  const basePath = '/myNetwork/invitation-manager'

  return (
    <Container>
        <div className="flex-1 h-fit bg-white dark:bg-backgroundC-dark rounded-md p-4 ">
          {/* Header */}
          <h2 className="text-lg font-semibold text-theme-secondary pb-2 border-b mb-4">
            Manage invitations
          </h2>
          {/* Tab Links */}
          <div className="flex border-b mb-4 space-x-6 text-sm font-medium">
            <TabLink href={`${basePath}/received`} text="Received" />
            <TabLink href={`${basePath}/sent`} text="Sent" />
          </div>

          {children }
        </div>
        <FollowersLinkSection />
      </Container>
  )
}


