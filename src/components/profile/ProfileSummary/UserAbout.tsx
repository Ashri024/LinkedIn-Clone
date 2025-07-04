'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useDialogStore } from '@/store/dialogStore';
import ContactInfo from './dialog/ContactInfo';
import {  IProfile } from '@/models/Profile';
import toast from 'react-hot-toast';


function UserAbout({initialProfile, isOwner}: {initialProfile: IProfile, isOwner: boolean}) {
  const [profile, setProfile] = useState<IProfile>(initialProfile);
  const [followersCount, setFollowersCount] = useState<number>(0);

  useEffect(() => {
    setProfile(initialProfile);
    // Fetch followers count from the profile /api/follow/get-followers-count/:targetId endpoint
    const fetchFollowersCount = async () => {
      try {
        const response = await fetch(`/api/follow/get-followers-count/${initialProfile._id}`);
        if (!response.ok) {
          toast.error('Failed to fetch followers count');
          return;
        }
        const data = await response.json();
        setFollowersCount(data.count);
      } catch (error) {
        console.error('Error fetching followers count:', error);
      }
    };
    if(isOwner)
    fetchFollowersCount();
  }, [initialProfile, isOwner]);
  return (
    <>
      <div className="flex flex-col gap-2">
        <div className="text-theme mt-3 sm:mt-0 space-y-1">
          <h1 className="text-xl font-semibold">{profile?.firstName} {profile?.lastName}</h1>
          <p className="text-sm text-theme-secondary">
            {profile?.headline}
          </p>
          <p className="text-sm text-theme-secondary flex items-center gap-2">
            <span>
            {profile?.location?.city}, {profile?.location?.countryRegion}
            </span> 
            ·
             <span className="linkedIn-link"
               onClick={() => useDialogStore.getState().openDialog(
                <ContactInfo profile={profile} isOwner={isOwner} setProfile={setProfile} />
              )}
             >
              Contact info</span>
          </p>
          <div className='flex gap-2'>
            {isOwner && <><Link href={"/myNetwork/network-manager/people-follow/followers/"} className="text-sm linkedIn-link">{followersCount} followers</Link>
            <p className="text-sm text-muted-foreground">·</p></>}
            <Link href={"/myNetwork/invite-connect/connections/"} className="text-sm linkedIn-link">0 connections</Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default UserAbout