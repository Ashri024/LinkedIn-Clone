'use client';

import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { OnboardingFormData, OnboardingSchema } from '@/lib/validations/onboarding';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import { signIn, useSession } from 'next-auth/react';
import { useAuthStore } from '@/store/authStore';

interface Props {
  sessionImage?: string | null;
  prefillData: Partial<OnboardingFormData>;
}

export default function OnboardingForm({ sessionImage, prefillData }: Props) {
  const router = useRouter();
  const { data: session } = useSession();
  const [step, setStep] = useState(1);
  const signUpMode = useAuthStore((state) => state.signUpMode);
  const emailFromStore = useAuthStore((state) => state.email);
  const passwordFromStore = useAuthStore((state) => state.password);

  const methods = useForm<OnboardingFormData>({
    resolver: zodResolver(OnboardingSchema),
    mode: 'onTouched',
    defaultValues: prefillData,
  });

  const onSubmitFinal = async (data: OnboardingFormData) => {
    const res = await fetch('/api/profile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...data,
        profileImageUrl: sessionImage,
        authProvider: session?.user?.authProvider || 'credentials',
        location: { countryRegion: data.country },
        phoneNumber: data.phone,
      }),
    });

    if (!res.ok) {
      const result = await res.json();
      alert(result.message || 'Something went wrong');
      return;
    }

    if (signUpMode === 'credentials') {
      const signInResult = await signIn('credentials', {
        redirect: false,
        email: emailFromStore,
        password: passwordFromStore,
      });
      if (signInResult?.ok) {
        router.push('/');
      } else {
        alert('Sign in failed after registration');
      }
    } else {
      router.push('/');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] px-4">
      <div className="w-full max-w-md space-y-6 p-6 rounded-lg shadow bg-white dark:bg-backgroundC-dark">
        <h1 className="text-2xl font-semibold text-center">Complete Your Profile</h1>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmitFinal)} className="space-y-4">
            {step === 1 && <StepOne onNext={() => setStep(2)} />}
            {step === 2 && (
              <StepTwo
                onBack={() => setStep(1)}
                isSubmitting={methods.formState.isSubmitting}
              />
            )}
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
