'use client';

import { useRouter } from 'next/navigation';
import { OnboardingFormData } from '@/lib/validations/onboarding';
import { Session } from 'next-auth';
import { SignUpMode } from '@/store/authStore';

type RunCheckProps = {
  email: string | undefined;
  password: string;
  session: Session | null;
  router: ReturnType<typeof useRouter>;
  signUpMode: SignUpMode;
  userStatus: number | null; // NEW
  setPrefillData: (data: Partial<OnboardingFormData>) => void;
};

export async function runCheckAndRedirect({
  email,
  password,
  session,
  router,
  signUpMode,
  userStatus,
  setPrefillData,
}: RunCheckProps) {
  const userEmail = signUpMode === 'credentials' ? email : session?.user?.email;
  const userPassword = signUpMode === 'credentials' ? password : '';
  console.log("RUnning runcheck and redirect")
  // Even in case of -1, userEmail will exist if its signUpMode is 'credentials'
  if (!userEmail) {
    router.replace('/auth/signup');
  }

  // 👇 New redirect logic based on layout-provided status
  if (userStatus === 2) {
    router.replace('/');
    return;
  }

  if (userStatus === 1) {
    router.replace('/auth/onboarding/more-details');
    return;
  }
  // If userStatus is 0 or -1, prefill form data
  setPrefillData({
    email: userEmail,
    firstName: session?.user?.firstName || '',
    lastName: session?.user?.lastName || '',
    password: userPassword || undefined,
  });
}
