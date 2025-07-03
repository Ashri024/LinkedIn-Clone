import InvitationCard from '@/components/myNetwork/InvitationCard'
import { mockInvitations } from '@/components/myNetwork/InvitationSection'
import React from 'react'

function ReceivedPage() {
  return (
    <div className='space-y-4 '>
    {mockInvitations.map((invite) => (
      <InvitationCard key={invite._id} data={invite} />
    ))}
    </div>
  )
}

export default ReceivedPage