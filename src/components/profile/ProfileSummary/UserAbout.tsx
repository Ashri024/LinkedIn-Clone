'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useDialogStore } from '@/store/dialogStore';
import ContactInfo from './dialog/ContactInfo';
import {  IProfilePopulated } from '@/models/Profile';


function UserAbout({initialProfile, isOwner}: {initialProfile: IProfilePopulated, isOwner: boolean}) {
  const [profile, setProfile] = useState<IProfilePopulated>(initialProfile);
  useEffect(() => {
    setProfile(initialProfile);
  }, [initialProfile]);
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
            <Link href={"/myNetwork/network-manager/people-follow/followers/"} className="text-sm linkedIn-link">{profile?.followers?.length} followers</Link>
            <p className="text-sm text-muted-foreground">·</p>
            <Link href={"/myNetwork/invite-connect/connections/"} className="text-sm linkedIn-link">{profile?.connections?.length} connections</Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default UserAbout