'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import OnboardingForm from '@/components/onboarding/OnboardingForm';
import { OnboardingFormData } from '@/lib/validations/onboarding';
import { useAuthStore } from '@/store/authStore';

export default function OnboardingPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { email, signUpMode,password } = useAuthStore();
  const [checkingUserStatus, setCheckingUserStatus] = useState(true);
  const [prefillData, setPrefillData] = useState<Partial<OnboardingFormData>>({});

  useEffect(() => {
    if (status === 'loading') return;
    const runCheck = async () => {
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
        if (data.exists) {
          router.replace('/');
        } else {
          setPrefillData({
            email: userEmail,
            firstName: session?.user?.firstName || '',
            lastName: session?.user?.lastName || '',
            password: userPassword || undefined,
          });
          setCheckingUserStatus(false);
        }
      } catch (err) {
        console.error('Error checking profile:', err);
      }
    };

    runCheck();
  }, [session, status, router, signUpMode, email, password]);

  if (checkingUserStatus) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <OnboardingForm
      sessionImage={session?.user?.image}
      prefillData={prefillData}
    />
  );
}
