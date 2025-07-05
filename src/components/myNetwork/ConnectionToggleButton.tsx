import { ConnectionStatus } from '@/models/Connection';
import React, { useEffect, useState } from 'react'
import { FaUserFriends } from 'react-icons/fa'

function ConnectionToggleButton({className, receiverId, connected}: {className?: string, receiverId: string, connected?:  ConnectionStatus}) {
  const [connectedState, setConnectedState] = useState<ConnectionStatus |undefined>(connected);
  const [loading, setLoading] = useState(false);
  const handleClick = async (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    e.preventDefault();
    setLoading(true);
    try {
      if (!connectedState) {
        // Not connected, send request
        const res = await fetch(`/api/connection/${receiverId}`, { method: 'POST' });
        if (res.ok) setConnectedState('pending');
      } else if (connectedState === 'pending') {
        // Withdraw request
        const res = await fetch(`/api/connection/${receiverId}`, { method: 'DELETE' });
        if (res.ok) setConnectedState(undefined);
      } else if (connectedState === 'accepted') {
        // Remove connection
        const res = await fetch(`/api/connection/${receiverId}`, { method: 'DELETE' });
        if (res.ok) setConnectedState(undefined);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // console.log("Connected state changed: ", connected);
    setConnectedState(connected);
  }, [connected]);
  if (connectedState === 'pending') {
    return (
      <button
        className={`linkedIn-button-outline flex items-center justify-center gap-2 ${className}`}
        disabled={loading}
        onClick={(e) => handleClick(e)}
      >
        <FaUserFriends size={18} /> Pending
      </button>
    );
  }
  if (connectedState === 'accepted') {
    return (
      <button
        className={`linkedIn-button-filled flex items-center justify-center gap-2 ${className}`}
        disabled={loading}
        onClick={(e)=> handleClick(e)}
      >
        <FaUserFriends size={18} /> Connected
      </button>
    );
  }
  return (
    <button
      className={`linkedIn-button-filled flex items-center justify-center gap-2 ${className}`}
      disabled={loading}
      onClick={(e) => handleClick(e)}
    >
      <FaUserFriends size={18} /> Connect
    </button>
  );
}



export default ConnectionToggleButton