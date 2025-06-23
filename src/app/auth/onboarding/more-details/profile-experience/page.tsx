'use client';

import StepExperience from '@/components/auth/onboarding/more-details/StepExperience';
import StepStudent from '@/components/auth/onboarding/more-details/StepStudent';
// import LoaderComponent from '@/components/LoaderComponent';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ProfileExperiencePage() {
  const [isStudent, setIsStudent] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();
  // Check authStep === 2
  useEffect(() => {
  if (status === 'loading') return; // Wait for session to load
    const checkAndRedirect = async () => {
      console.log("User session /profile-experience:", session?.user?.authStep);
      if(session?.user?.authStep !== 2) {
        console.log("/STEP-EXPERIENCE: NOT EQUALS TO 2 IN PROFILE-EXPERIENCE");
        router.replace('/auth/onboarding/more-details');
        return;
      }
  };
  checkAndRedirect();
  }, [router, session?.user?.authStep, status]);
  // if (status === 'loading') {
  //   return <LoaderComponent />; // or a loader component
  // }
  return (
    <>
      {isStudent ? (
        <StepStudent onNotStudent={() => setIsStudent(false)} />
      ) : (
        <StepExperience
          onStudentToggle={() => setIsStudent(true)}
        />
      )}

    </>
  );
}
