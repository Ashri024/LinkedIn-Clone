'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import OnboardingForm from '@/components/auth/onboarding/OnboardingForm';
import { OnboardingFormData } from '@/lib/validations/onboarding';
import { useAuthStore } from '@/store/authStore';
import { runCheckAndRedirect } from '@/lib/db/frontend/user';
import LoaderComponent from '@/components/LoaderComponent';

export default function OnboardingPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { email, signUpMode, password } = useAuthStore();
  const [checkingUserStatus, setCheckingUserStatus] = useState(true);
  const [prefillData, setPrefillData] = useState<Partial<OnboardingFormData>>({});

  useEffect(() => {
    if (status === 'loading') return;
    console.log('Session userAuthStep /onboarding:', session?.user?.authStep);
    runCheckAndRedirect({
      email,
      password,
      session,
      router,
      signUpMode,
      setCheckingUserStatus,
      setPrefillData,
    });
  }, [session, status, router, signUpMode, email, password]);

  if (checkingUserStatus || status === 'loading') {
    return <LoaderComponent text='Onboarding your first journey with us ...'/>;
  }

  return (
    <OnboardingForm
      sessionImage={session?.user?.image}
      prefillData={prefillData}
    />
  );
}
