import Container from '@/components/Container'
import ConnectionCardList from '@/components/myNetwork/ConnectionCardList';
import FollowersLinkSection from '@/components/myNetwork/followers/FollowersLinkSection';
import { authOptions } from '@/lib/authOptions';
import { getConnections } from '@/lib/db/backend/connection';
import { getServerSession } from 'next-auth';

async function ConnectionsPage() {
  const session = await getServerSession(authOptions);
  const invitations = await getConnections(session?.user?._id || '');
  const safeInvitations = invitations.map((invite) => {
    const doc = invite._doc || invite;
    return {
      _id: (doc._id && doc._id.toString()) || (invite._id && invite._id.toString()),
      firstName:  doc.firstName || '',
      lastName:  doc.lastName || '',
      headline: doc.headline,
      profileImageUrl: doc.profileImageUrl,
      connectedDate: doc.connectedDate ? new Date(doc.connectedDate) : undefined,
    };
  });
  return (
    <Container>
    <div className="flex-1 h-fit bg-white dark:bg-backgroundC-dark rounded-md p-4 ">
      {/* Header */}
        <ConnectionCardList safeInvitations={safeInvitations} />
    </div>
    <FollowersLinkSection />
  </Container>
  )
}

export default ConnectionsPage