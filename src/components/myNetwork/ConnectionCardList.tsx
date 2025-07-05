'use client'
import React, { useState } from 'react'
import ConnectionCard, { ConnectionCardProps } from './ConnectionCard'

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
            <div className="text-muted-foreground text-sm">
            No connections found.
            </div>
            }
        </div>
      </>
  )
}

export default ConnectionCardList