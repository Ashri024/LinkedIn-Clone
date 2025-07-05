"use client"
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { FaCheck, FaPlus } from 'react-icons/fa';

function FollowToggleButton({ isFollowing, userViewedId , className}: { isFollowing: boolean, userViewedId: string, className?: string }) {
    const [isFollowingState, setIsFollowingState] = useState(isFollowing);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setIsFollowingState(isFollowing);
  }, [isFollowing]);

  const toggleFollow =async () => {
    setIsFollowingState((prev) => !prev);
    const method = isFollowingState ? 'DELETE' : 'POST';
    setLoading(true);
    const res = await fetch(`/api/follow/${userViewedId}`, { method });
    setLoading(false);
    await res.json();
    // console.log('Response:', response);
    if (!res.ok) {
      const errorData = await res.json();
      console.error('Error:', errorData.error || 'Failed to toggle follow');
      toast.error(errorData.error || 'Failed to toggle follow');
      setIsFollowingState(isFollowing); // Revert state on error
      return;
    }
    
  }
  return (
    <button className={` ${isFollowingState?"linkedIn-button-outline2":"linkedIn-button-outline"} flex items-center justify-center gap-1 ${className}`}
    onClick={(e)=>{
      e.stopPropagation();
      e.preventDefault();
      toggleFollow();
    }}
    disabled={loading}
    >
      {isFollowingState ?<FaCheck size={14} /> : <FaPlus size={14} />}
    
    {isFollowingState ? 'Following' : 'Follow'}
    </button>
  )
}

export default FollowToggleButton