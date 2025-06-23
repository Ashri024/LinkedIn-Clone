"use client";
import LoaderComponent from '@/components/LoaderComponent';
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';

function MoreDetailsPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const pathname = usePathname();
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      if (status === 'loading') return; // Wait for session to load
      const checkAndRedirect = async () => {
        setLoading(true);
        console.log("authstep in /more-details:", session?.user?.authStep);
        
        const stepPaths = {
          1: '/auth/onboarding/more-details/profile-location',
          2: '/auth/onboarding/more-details/profile-experience',
          3: '/auth/onboarding/more-details/profile-email-verification',
          4: '/auth/onboarding/more-details/profile-job-preference',
          5: '/profile',
        };
  
        if (session?.user?.authStep===undefined) {
          router.replace('/auth/signup');
          return;
        } else if (session?.user?.authStep === 0) {
          router.replace('/auth/onboarding');
          return;
        } else if (session?.user?.authStep===3 && stepPaths[session?.user?.authStep] && pathname !== stepPaths[session?.user?.authStep]) {
          if(session?.user?.authProvider === 'credentials') {
            router.replace(stepPaths[3]);
            return;
          }
          else {
            router.replace(stepPaths[4]);
            return;
          }
        }else if (stepPaths[session?.user?.authStep] && pathname !== stepPaths[session?.user?.authStep]) {
          router.replace(stepPaths[session?.user?.authStep]);
          return;
        }
  
        setLoading(false);
      };
  
      checkAndRedirect();
    }, [router, pathname, status, session?.user?.authStep,session?.user?.authProvider]);
  
    if (loading || status === 'loading') {
      return <LoaderComponent text="Checking Profile Status..." />;
    }
    return (
     <></>
    );
}

export default MoreDetailsPage