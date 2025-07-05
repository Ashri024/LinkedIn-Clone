import { getServerSession } from 'next-auth';
import SuggestionCard, { SuggestionCardProps } from './SuggestionCard';
import { authOptions } from '@/lib/authOptions';
import { getAllUsersExceptCurrent } from '@/lib/db/backend/user';
import { getFollowing } from '@/lib/db/backend/follower';
import { getConnectionsAll } from '@/lib/db/backend/connection';
import { ConnectionStatus } from '@/models/Connection';

async function PeopleYouMayKnowSection() {
  const session = await getServerSession(authOptions);
  const suggestions = await getAllUsersExceptCurrent(session?.user?.email || '') as SuggestionCardProps[];
  const followingRes = await getFollowing(session?.user?._id || '');
  const connections = await getConnectionsAll(session?.user?._id || '');
  const connectionMap: { [userId: string]: ConnectionStatus } = {};
  connections.forEach((conn) => {
    connectionMap[conn._id.toString()] = connections.find(c => c._id.toString() === conn._id.toString())?.status || undefined;
  });
  const following = followingRes.following || [];
  const followingIds = following.map((f) => f._id.toString());

  const filteredSuggestions = suggestions.filter((sug) => {
    const isConnected = connections.some((conn) => conn._id.toString() === sug._id.toString() && (conn.status === 'accepted' || conn.status === 'pending'));
    return !isConnected;
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-medium text-base">
          People you may know
        </h2>
        {/* <button className="text-sm text-blue-500 hover:underline">Show all</button> */}
      </div>
      <div className="grid gap-2 grid-cols-2  min-[950px]:grid-cols-4">
        {filteredSuggestions.map((sug) => (
          <SuggestionCard key={sug._id} data={sug}
            isFollowing={followingIds.includes(sug._id.toString())}
            connected={connectionMap[sug._id] || undefined}
           />
        ))}
      </div>
    </div>
  );
}

export default PeopleYouMayKnowSection;
