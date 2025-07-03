import Link from 'next/link';
import InvitationCard, { InvitationCardProps } from './InvitationCard';

export const mockInvitations : InvitationCardProps[]= [
  {
    _id: '1',
    type: 'connect',
    name: 'Nishchay Arora',
    follows: true,
    headline: 'Frontend developer |Student at Manipal University Jaipur',
    profileImageUrl: '/default-profile.svg',
  },
  {
    _id: '2',
    type: 'follow-connect',
    name: 'Shubham Sharma',
    follows: false,
    headline: 'ATTENDING MANIPAL UNIVERSITY JAIPUR RAJASTHAN',
    profileImageUrl: '/default-profile.svg',
  },
];

function InvitationSection() {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-medium text-base">Invitations ({mockInvitations.length})</h2>
        <Link href="myNetwork/invitation-manager/received/" className="linkedIn-button-ghost">Show all</Link>
      </div>
      <div className="space-y-4">
        {mockInvitations.map((invite) => (
          <InvitationCard key={invite._id} data={invite} />
        ))}
      </div>
    </div>
  );
}

export default InvitationSection;
