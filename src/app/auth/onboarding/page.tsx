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

  if (checkingUserStatus) {
    return <LoaderComponent text='Onboarding'/>;
  }

  return (
    <OnboardingForm
      sessionImage={session?.user?.image}
      prefillData={prefillData}
    />
  );
}
