// import { PeopleFollowProvider } from '@/app/providers/PeopleFollowContext';
import React from 'react'
// import { authOptions } from '@/lib/authOptions'
// import { getFollowers } from '@/lib/db/backend/follower'
// import { getServerSession } from 'next-auth'

async function MyNetworkLayout({children}: {children: React.ReactNode}) {
    // const session = await getServerSession(authOptions)
    // const followingData = await getFollowing(session?.user?._id || '');
    // const following = followingData?.following || [];
    // const safeFollowing = following.map((user) => {
    //   const doc = user._doc || user;
    
    //   return {
    //     _id: (doc._id && doc._id.toString()) || (user._id && user._id.toString()),
    //     firstName: doc.firstName,
    //     lastName: doc.lastName,
    //     headline: doc.headline,
    //     profileImageUrl: doc.profileImageUrl,
    //   };
    // });
    // const followingIds = following.map((f) => f._id.toString());
  
    // const followersData = await getFollowers(session?.user?._id || '');
    // const followers = followersData?.followers|| [];
    // const safeFollowers = followers.map((user) => {
    // const doc = user._doc || user;
  
    //   return {
    //     _id: (doc._id && doc._id.toString()) || (user._id && user._id.toString()),
    //     firstName: doc.firstName,
    //     lastName: doc.lastName,
    //     headline: doc.headline,
    //     profileImageUrl: doc.profileImageUrl,
    //   };
    // });
    // const followersIds = followers.map((f) => f._id.toString());
  
  return (
    <div>
        {children}
    </div>
  )
}

export default MyNetworkLayout