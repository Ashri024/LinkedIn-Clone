"use client";
import LoaderComponent from '@/components/LoaderComponent';
import React, { useEffect} from 'react'
import { useSession } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';

function MoreDetailsPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const pathname = usePathname();
  
    useEffect(() => {
      if (status !== 'authenticated' || !session?.user) return;
    
      const checkAndRedirect = async () => {
        console.log("authstep in /more-details:", session.user.authStep);
    
        const stepPaths = {
          1: '/auth/onboarding/more-details/profile-location',
          2: '/auth/onboarding/more-details/profile-experience',
          3: '/auth/onboarding/more-details/profile-email-verification',
          4: '/auth/onboarding/more-details/profile-job-preference',
          5: '/feed',
        };
    
        if (typeof session.user.authStep !== 'number') {
          window.location.reload(); // 🔁 Safe fallback
          return;
        }
    
        if (session.user.authStep === 0) {
          router.replace('/auth/onboarding');
        } else if (session.user.authStep === 3 && pathname !== stepPaths[3]) {
          router.replace(session.user.authProvider === 'credentials' ? stepPaths[3] : stepPaths[4]);
        } else if (stepPaths[session.user.authStep] && pathname !== stepPaths[session.user.authStep]) {
          router.replace(stepPaths[session.user.authStep]);
        }
      };
    
      checkAndRedirect();
    }, [router, pathname, status, session]);
    
  
    if (status === 'loading') {
      return <LoaderComponent  />;
    }
    return (
     <LoaderComponent />
    );
}

export default MoreDetailsPage