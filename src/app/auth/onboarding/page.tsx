'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { OnboardingSchema, OnboardingFormData } from '@/lib/validations/onboarding';
import { useRouter } from 'next/navigation';

export default function OnboardingPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [checkingUserStatus, setCheckingUserStatus] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    setValue,
  } = useForm<OnboardingFormData>({
    resolver: zodResolver(OnboardingSchema),
    mode: 'onChange',
  });

  useEffect(() => {
    // ✅ If session is loading, wait
    console.log("Status: ", status);
    if (status === 'loading') return;

    const runCheck = async () => {
      // Not signed in? Redirect
      if (!session?.user?.email) {
        router.replace('/auth/signin');
        return;
      }
  
      // ✅ Check if profile already exists
      try {
        const res = await fetch('/api/profile/check', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: session.user.email }),
        });
        const data = await res.json();
  
        if (data.exists) {
          router.replace('/'); // Already onboarded
          return;
        } else {
          // Prefill form
          setValue('firstName', session.user.firstName?.split(' ')[0] || '');
          setValue('lastName', session.user.lastName?.split(' ')[0] || '');
          setValue('email', session.user.email || '');
        }
        
      } catch (err) {
        console.error('Error checking profile:', err);
      }
      setCheckingUserStatus(false);
  
    };
  
    runCheck();
  }, [session, status, router, setValue]);

  const onSubmit = async (data: OnboardingFormData) => {
    const res = await fetch('/api/profile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        authProvider: 'google',
        ...data,
        profileImageUrl: session?.user.image,
        location: { countryRegion: data.country },
        phoneNumber: data.phone,
      }),
    });

    if (res.ok) {
      router.push('/');
    } else {
      const result = await res.json();
      alert(result.message || 'Something went wrong');
    }
  };

  if (checkingUserStatus) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }
  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-xl font-semibold mb-4">Complete Your Profile</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Email */}
        <div>
          <label>Email</label>
          <input {...register('email')} className="input w-full" />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>

        {/* First Name */}
        <div>
          <label>First Name</label>
          <input {...register('firstName')} className="input w-full" />
          {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
        </div>

        {/* Last Name */}
        <div>
          <label>Last Name</label>
          <input {...register('lastName')} className="input w-full" />
          {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
        </div>

        {/* Phone */}
        <div>
          <label>Phone Number</label>
          <input {...register('phone')} className="input w-full" placeholder="10-digit number" />
          {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
        </div>

        {/* Country */}
        <div>
          <label>Country</label>
          <input {...register('country')} className="input w-full" />
          {errors.country && <p className="text-red-500 text-sm">{errors.country.message}</p>}
        </div>

        <button
          type="submit"
          className="btn w-full bg-blue-500 text-white p-2 rounded hover:opacity-80 disabled:bg-gray-500"
          disabled={!isValid || isSubmitting}
        >
          {isSubmitting ? 'Creating Profile...' : 'Submit'}
        </button>
      </form>
    </div>
  );
}
