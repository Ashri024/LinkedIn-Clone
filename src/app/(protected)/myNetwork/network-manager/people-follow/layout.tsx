// app/mynetwork/network-manager/people-follow/layout.tsx

import { PeopleFollowProvider } from '@/app/providers/PeopleFollowContext'
import Container from '@/components/Container'
import FollowersLinkSection from '@/components/myNetwork/followers/FollowersLinkSection'
import TabLink from '@/components/TabLink'
import { authOptions } from '@/lib/authOptions'
import { getFollowers, getFollowing } from '@/lib/db/backend/follower'
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
  const followingData = await getFollowing(session?.user?._id || '');
  const following = followingData?.following || [];
  const safeFollowing = following.map((user) => {
    const doc = user._doc || user;
  
    return {
      _id: (doc._id && doc._id.toString()) || (user._id && user._id.toString()),
      firstName: doc.firstName,
      lastName: doc.lastName,
      headline: doc.headline,
      profileImageUrl: doc.profileImageUrl,
    };
  });
  const followingIds = following.map((f) => f._id.toString());

  const followersData = await getFollowers(session?.user?._id || '');
  const followers = followersData?.followers|| [];
  const safeFollowers = followers.map((user) => {
    const doc = user._doc || user;

    return {
      _id: (doc._id && doc._id.toString()) || (user._id && user._id.toString()),
      firstName: doc.firstName,
      lastName: doc.lastName,
      headline: doc.headline,
      profileImageUrl: doc.profileImageUrl,
    };
  });

  // console.log('Following Data:', safeFollowing);
  // console.log('Followers Data:', safeFollowers);
  return (
    <PeopleFollowProvider value={{ followers: safeFollowers, following: safeFollowing, followingIds: followingIds }}>
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
    </PeopleFollowProvider>
  )
}


