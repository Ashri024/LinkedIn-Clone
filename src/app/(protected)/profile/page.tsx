import { authOptions } from '@/lib/authOptions';
import { getServerSession } from 'next-auth';
import React from 'react'

async function profilePage() {
  // server session
  const session = await getServerSession(authOptions);
  console.log("Session authstep: ", session?.user?.authStep);
  return (
    <div className='dark:bg-black'>profilePage</div>
  )
}

export default profilePage