import ConnectionSentCard from '@/components/myNetwork/ConnectionSentCard'
import { mockInvitations } from '@/components/myNetwork/InvitationSection'
import React from 'react'

function SentPage() {
  return (
    <div className='space-y-4 '>
    {mockInvitations.map((invite) => (
      <ConnectionSentCard key={invite._id} data={invite} />
    ))}
    </div>
  )
}

export default SentPage