'use client'
import React, { useState } from 'react'
import ConnectionCard, { ConnectionCardProps } from './ConnectionCard'
import NoContentCard from './NoContentCard';

function ConnectionCardList({safeInvitations}: {safeInvitations: ConnectionCardProps[]}) {
    const [safeInvitationsState, setSafeInvitationsState] = useState<ConnectionCardProps[]>(safeInvitations);
    
  return (
    <>
        <h2 className="text-lg font-semibold text-theme-secondary pb-2 border-b mb-4">
            {safeInvitationsState.length || "No"} Connections
        </h2>
        <div className='space-y-4'>
            {/* Connection Cards */}
            {safeInvitationsState.length>0?
            safeInvitationsState.map((connection) => (
            <ConnectionCard key={connection._id} data={connection} setSafeInvitationsState={setSafeInvitationsState} />
            )):
            <NoContentCard text="You have no connections yet. Connect with people to see them here." />
            }
        </div>
      </>
  )
}

export default ConnectionCardList