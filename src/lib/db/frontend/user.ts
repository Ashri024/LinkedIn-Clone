'use client';

import { useRouter } from 'next/navigation';
import { OnboardingFormData } from '@/lib/validations/onboarding';
import { Session } from 'next-auth';
import { SignUpMode } from '@/store/authStore';

type RunCheckProps = {
  email: string | null | undefined;
  password: string;
  session: Session | null;
  router: ReturnType<typeof useRouter>;
  signUpMode: SignUpMode;
  setCheckingUserStatus: (val: boolean) => void;
  setPrefillData: (data: Partial<OnboardingFormData>) => void;
};

export async function runCheckAndRedirect({
  email,
  password,
  session,
  router,
  signUpMode,
  setCheckingUserStatus,
  setPrefillData,
}: RunCheckProps) {
  const userEmail = signUpMode === 'credentials' ? email : session?.user?.email;
  const userPassword = signUpMode === 'credentials' ? password : '';

  if (!userEmail) {
    router.replace('/auth/signup');
    return;
  }

  try {
    const res = await fetch('/api/profile/check', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: userEmail }),
    });

    const data = await res.json();

    if (data.status === 0) {
      // New user – show onboarding form
      setPrefillData({
        email: userEmail,
        firstName: session?.user?.firstName || '',
        lastName: session?.user?.lastName || '',
        password: userPassword || undefined,
      });
      setCheckingUserStatus(false);
    } else if (data.status === 1) {
      router.replace('/auth/onboarding/more-details');
    } else if (data.status === 2) {
      router.replace('/');
    } else {
      console.warn('Unknown user status code:', data.status);
    }
  } catch (err) {
    console.error('Error checking user status:', err);
  }
}
