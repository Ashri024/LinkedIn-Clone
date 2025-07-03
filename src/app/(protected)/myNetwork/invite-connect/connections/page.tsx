import Container from '@/components/Container'
import ConnectionCard, { ConnectionCardProps } from '@/components/myNetwork/ConnectionCard';
import FollowersLinkSection from '@/components/myNetwork/followers/FollowersLinkSection';
import React from 'react'
export const sampleConnections: ConnectionCardProps[] = [
  {
      _id: '1',
      name: 'John Doe',
      headline: 'Software Engineer at Tech Company',
      profileImageUrl: '/default-profile.svg',
      connectedDate: new Date('2023-01-15'),
  },
  {
      _id: '2',
      name: 'Jane Smith',
      headline: 'Product Manager at Startup',
      profileImageUrl: '/default-profile.svg',
      connectedDate: new Date('2023-02-20'),
  },
  {
      _id: '3',
      name: 'Alice Johnson',
      headline: 'Data Scientist at Analytics Firm',
      profileImageUrl: '/default-profile.svg',
  },
  {
      _id: '4',
      name: 'Bob Brown',
      headline: 'UX Designer at Creative Agency',
      profileImageUrl: '/default-profile.svg',
      connectedDate: new Date('2023-03-10'),
  },
];
function ConnectionsPage() {
  const connectionNum = 1501;
  return (
    <Container>
    <div className="flex-1 h-fit bg-white dark:bg-backgroundC-dark rounded-md p-4 ">
      {/* Header */}
      <h2 className="text-lg font-semibold text-theme-secondary pb-2 border-b mb-4">
        {connectionNum} Connections
      </h2>
      <div className='space-y-4'>
        {/* Connection Cards */}
        {sampleConnections.map((connection) => (
          <ConnectionCard key={connection._id} data={connection} />
        ))}
      </div>
    </div>
    <FollowersLinkSection />
  </Container>
  )
}

export default ConnectionsPage