import ConnectionSentCard from '@/components/myNetwork/ConnectionSentCard'
// import { InvitationCardProps } from '@/components/myNetwork/InvitationCard';
import { authOptions } from '@/lib/authOptions';
import { getSentRequests } from '@/lib/db/backend/connection';
import { getServerSession } from 'next-auth';
// import { mockInvitations } from '@/components/myNetwork/InvitationSection'
import React from 'react'
// export type InvitationCardProps = {
//   _id: string;
//   name: string;
//   headline: string;
//   profileImageUrl: string;
//   followsYou?: boolean; // Optional, if you want to track if the user is already following
// };

async function SentPage() {
  const session = await getServerSession(authOptions);
  const invitations = await getSentRequests(session?.user?._id || '');
  const safeInvitations = invitations.map((invite) => {
    const doc = invite._doc || invite;
    return {
      _id: (doc._id && doc._id.toString()) || (invite._id && invite._id.toString()),
      firstName: doc.firstName || '',
      lastName: doc.lastName || '', // Optional field, default to empty string if not present
      headline: doc.headline,
      profileImageUrl: doc.profileImageUrl,
      followsYou: !!doc.followsYou, // Optional field, default to false if not present
    };
  });
  return (
    <div className='space-y-4 '>
    {safeInvitations.length>0?
    safeInvitations.map((invite) => (
      <ConnectionSentCard key={invite._id} data={invite} />
    )):
    <div className="text-muted-foreground text-sm">
      No invitations sent.
    </div>
    }
    </div>
  )
}

export default SentPage