import Container from '@/components/Container';
import React from 'react';
import NetworkSidebar from '@/components/myNetwork/NetworkSidebar';
import InvitationSection from '@/components/myNetwork/InvitationSection';
import PeopleYouMayKnowSection from '@/components/myNetwork/PeopleYouMayKnowSection';
import FollowersLinkSection from '@/components/myNetwork/followers/FollowersLinkSection';

async function MyNetworkPage() {
  // Later: fetch invitations and suggestions from your DB here

  return (
    <Container>
      <div className="w-full md:max-w-[300px] h-fit rounded-md  flex flex-col gap-4 ">
        <NetworkSidebar />
        <FollowersLinkSection />
      </div>

      <div className="flex-1 h-fit space-y-6">
        <div className="bg-white dark:bg-backgroundC-dark rounded-md p-4">
          <InvitationSection />
        </div>
        <div className="bg-white dark:bg-backgroundC-dark rounded-md p-4">
          <PeopleYouMayKnowSection />
        </div>
      </div>
    </Container>
  );
}

export default MyNetworkPage;
