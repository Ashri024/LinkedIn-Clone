"use client";
import LoaderComponent from '@/components/LoaderComponent';
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import { checkUserProfile } from '@/lib/db/frontend/user';


function MoreDetailsPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const pathname = usePathname();
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      console.log("Current user:", session?.user);
      const checkAndRedirect = async () => {
        setLoading(true);
        const hasProfile = await checkUserProfile(session?.user.email || undefined);
        console.log("User exists after session check:", hasProfile);
  
        const stepPaths = {
          1: '/auth/onboarding/more-details/profile-location',
          2: '/auth/onboarding/more-details/profile-experience',
          3: '/auth/onboarding/more-details/profile-email-verification',
          4: '/auth/onboarding/more-details/profile-job-preference',
          5: '/profile',
        };
  
        if (hasProfile === -1) {
          router.replace('/auth/signup');
          return;
        } else if (hasProfile === 0) {
          router.replace('/auth/onboarding');
          return;
        } else if (stepPaths[hasProfile] && pathname !== stepPaths[hasProfile]) {
          router.replace(stepPaths[hasProfile]);
          return;
        }
  
        setLoading(false);
      };
  
      checkAndRedirect();
    }, [session, router, pathname]);
  
    if (loading || status === 'loading') {
      return <LoaderComponent text="Checking Profile Status..." />;
    }
    return (
     <></>
    );
}

export default MoreDetailsPage