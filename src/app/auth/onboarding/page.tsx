'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import OnboardingForm from '@/components/auth/onboarding/OnboardingForm';
import { OnboardingFormData } from '@/lib/validations/onboarding';
import { useAuthStore } from '@/store/authStore';
import { runCheckAndRedirect } from '@/lib/db/frontend/user';
import { UserStatusContext } from '@/lib/context/UserStatusContext';
import LoaderComponent from '@/components/LoaderComponent';

export default function OnboardingPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { email, signUpMode, password } = useAuthStore();
  const { userStatus } = useContext(UserStatusContext); // 👈 from layout

  const [prefillData, setPrefillData] = useState<Partial<OnboardingFormData>>({});

  useEffect(() => {
    console.log('User Status in onboarding:', userStatus);
    if (status === 'loading' || userStatus === null) return;

    runCheckAndRedirect({
      email,
      password,
      session,
      router,
      signUpMode,
      userStatus,
      setPrefillData,
    });
  }, [session, status, userStatus, router, signUpMode, email, password]);

  if ( userStatus === null || status === 'loading') {
    return <LoaderComponent text="Loading..." />;
  }
  return (
    <OnboardingForm
      sessionImage={session?.user?.image}
      prefillData={prefillData}
    />
  );
}
