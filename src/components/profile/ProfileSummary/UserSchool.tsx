import { IProfile } from '@/models/Profile';
import Image from 'next/image'
import React from 'react'
import DefaulCompany from '@/../public/default-company.svg';

function UserSchool(
  { initialProfile }: { initialProfile: IProfile }
) {
  if (!initialProfile.workingAt) return null;
  return (
    <div className='absolute top-0 right-16 flex gap-2 items-center justify-center cursor-pointer'>
    <Image
    src={DefaulCompany}
    alt="profile-image"
    width={30}
    height={30}
  />  
    <p className='text-xs'>
    { initialProfile?.workingAt}
      </p>
  </div>
  )
}

export default UserSchool