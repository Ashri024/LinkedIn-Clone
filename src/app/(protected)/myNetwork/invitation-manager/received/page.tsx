import InvitationCard from '@/components/myNetwork/InvitationCard'
// import { mockInvitations } from '@/components/myNetwork/InvitationSection'
import { authOptions } from '@/lib/authOptions';
import { getIncomingRequests } from '@/lib/db/backend/connection';
// import { getFollowers } from '@/lib/db/backend/follower';
import { getServerSession } from 'next-auth';
import React from 'react'

async function ReceivedPage() {
  const session = await getServerSession(authOptions);
  const invitations = await getIncomingRequests(session?.user?._id || '');
  const safeInvitations = invitations.map((invite) => {
    const doc = invite._doc || invite;
    return {
      _id: (doc._id && doc._id.toString()) || (invite._id && invite._id.toString()),
      firstName: doc.firstName || '',
      lastName: doc.lastName || '', // Optional field, default to empty string if not present
      headline: doc.headline,
      profileImageUrl: doc.profileImageUrl,
      followsYou: !!doc.followsYou || false, // Optional field, default to false if not present
    } ;
  });
  return (
    <div className='space-y-4 '>
    {safeInvitations.length>0?
    safeInvitations.map((invite) => (
      <InvitationCard key={invite._id} data={invite} 
      // followsYou={followersIds.includes(invite._id) ? true : false}
      />
    )):
    <div className="text-muted-foreground text-sm">
      No invitations received.
    </div>
    }
    </div>
  )
}

export default ReceivedPage