"use client";
import React, { useContext, useEffect } from 'react'
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { UserStatusContext } from '@/lib/context/UserStatusContext';
import LoaderComponent from '@/components/LoaderComponent';
import { Button } from '@/components/ui/button';

function MoreDetailsPage() {
  const router = useRouter();
  const {data: session, status} = useSession();
  const { userStatus } = useContext(UserStatusContext); // 👈 from layout

  useEffect(() => {
    console.log('User Status in more details:', userStatus);
    if (userStatus === 2) router.replace('/');
    if (userStatus === 0 && session?.user?.email) {
      router.replace('/auth/onboarding');
    }
    if(userStatus===-1) {
      router.replace('/auth/signup');
    }
  }, [userStatus, router, session]);
  if (userStatus === null || status === 'loading') {
    return <LoaderComponent text='Loading...'/> // or a loader component
  }
  return (
    <div>
      <Button variant={"destructive"} onClick={() => signOut()}>
       Logout
      </Button>
    </div>
  )
}

export default MoreDetailsPage