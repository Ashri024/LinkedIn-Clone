'use client';

import { useRouter } from 'next/navigation';
import { OnboardingFormData } from '@/lib/validations/onboarding';
import { Session } from 'next-auth';
import { SignUpMode } from '@/store/authStore';
import { IUserExistStatus } from '../backend/user';

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
    
    const userExistStatus = await checkUserProfile(userEmail);

    if (userExistStatus === 0) {
      // New user – show onboarding form
      setPrefillData({
        email: userEmail,
        firstName: session?.user?.firstName || '',
        lastName: session?.user?.lastName || '',
        password: userPassword || undefined,
      });
      setCheckingUserStatus(false);
      return;
    } else if(userExistStatus >= 1 && userExistStatus <= 4) {
      router.replace('/auth/onboarding/more-details');
      return;
    } else if (userExistStatus === 5) {
      router.replace('/feed');
      return;
    } else {
      console.warn('Unknown user status code:', userExistStatus);
      return;
    }
  } catch (err) {
    console.error('Error checking user status:', err);
  }
}

export const checkUserProfile = async (email?: string) => {
  if (!email) {
    return -1; // No email provided
  }
  const res = await fetch('/api/profile/check', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
  const data = await res.json();
  return data.status as IUserExistStatus;
};