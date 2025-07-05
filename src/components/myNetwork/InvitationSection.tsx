import Link from 'next/link';
import InvitationCard from './InvitationCard';
import { authOptions } from '@/lib/authOptions';
import { getServerSession } from 'next-auth';
import { getIncomingRequests } from '@/lib/db/backend/connection';

// export const mockInvitations : InvitationCardProps[]= [
//   {
//     _id: '1',
//     name: 'Nishchay Arora',
//     followsYou: true,
//     headline: 'Frontend developer |Student at Manipal University Jaipur',
//     profileImageUrl: '/default-profile.svg',
//   },
//   {
//     _id: '2',
//     name: 'Shubham Sharma',
//     followsYou: false,
//     headline: 'ATTENDING MANIPAL UNIVERSITY JAIPUR RAJASTHAN',
//     profileImageUrl: '/default-profile.svg',
//   },
// ];

async function InvitationSection() {
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
    }
  });
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-medium text-base">Invitations ({invitations.length})</h2>
        <Link href="myNetwork/invitation-manager/received/" className="linkedIn-button-ghost">Show all</Link>
      </div>
      <div className="space-y-4">
        {safeInvitations.length>0?
        safeInvitations.map((invite) => (
          <InvitationCard key={invite._id} data={invite} />
        )):
        <div className="text-muted-foreground text-sm">
          No invitations received.
        </div>
        }
      </div>
    </div>
  );
}

export default InvitationSection;
