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
import toast from 'react-hot-toast';

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
    console.log('Final form data:', data);
    try {
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
  
      // 📛 Handle failed API responses
      if (!res.ok) {
        const result = await res.json().catch(() => ({})); // prevent crash if response isn't valid JSON
  
        const message =
          typeof result.message === 'string'
            ? result.message
            : 'Failed to create profile';
  
        toast.error(message);
        return;
      }
  
      toast.success('Profile created successfully');
  
      // ✅ Try signing in if using credentials mode
      if (signUpMode === 'credentials') {
        const signInResult = await signIn('credentials', {
          redirect: false,
          email: emailFromStore,
          password: passwordFromStore,
        });
  
        if (signInResult?.ok) {
          toast.success('Signed in successfully');
          router.push('/');
        } else {
          toast.error('Sign in failed after registration');
        }
      } else {
        router.push('/');
      }
    } catch (err: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
      // 🧨 Catch fetch/network or unexpected JS errors
      console.error('Unexpected error:', err);
  
      const fallbackMessage =
        typeof err?.message === 'string'
          ? err.message
          : 'Something went wrong. Please try again.';
  
      toast.error(fallbackMessage);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] px-4">
      <div className="w-full max-w-md space-y-6 p-6 rounded-lg shadow bg-white dark:bg-backgroundC-dark">
        <h1 className="text-2xl font-semibold text-center">Complete Your Profile</h1>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmitFinal)} className="space-y-4">
            <div style={{ display: step === 1 ? 'block' : 'none' }}>
              <StepOne onNext={() => setStep(2)} />
            </div>
            <div style={{ display: step === 2 ? 'block' : 'none' }}>
              <StepTwo
                onBack={() => setStep(1)}
                isSubmitting={methods.formState.isSubmitting}
              />
            </div>
        </form>
        </FormProvider>
      </div>
    </div>
  );
}
