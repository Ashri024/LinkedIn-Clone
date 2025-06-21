'use client';

import { useState, useEffect, FormEvent, useContext } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { SignUpForm } from '@/components/auth/signup/SignUpForm';
import { SignUpGoogle } from '@/components/auth/signup/SignUpGoogle';
import { UserStatusContext } from '@/lib/context/UserStatusContext';
import LoaderComponent from '@/components/LoaderComponent';

export default function SignUpPage() {
  const { data: session , status} = useSession();
  const router = useRouter();
  const { userStatus } = useContext(UserStatusContext);

  const [form, setForm] = useState({ email: '', password: '' });
  const [formErrors, setFormErrors] = useState<{ email?: string; password?: string }>({});
  const [submitting, setSubmitting] = useState(false);

  const setAuthData = useAuthStore((state) => state.setAuthData);
  const setSignUpMode = useAuthStore((state) => state.setSignUpMode);

  useEffect(() => {
    setAuthData({ email: '', password: '' });
  }, [setAuthData]);

  // 👇 Redirect if session already exists and user has completed onboarding
  useEffect(() => {
    if (userStatus === 2) router.replace('/');
    if (userStatus === 1) router.replace('/auth/onboarding/more-details');
    if (userStatus === 0 && session?.user?.email) {
      router.replace('/auth/onboarding');
    }
  }, [userStatus, router, session]);

  const checkUserProfile = async (email: string) => {
    const res = await fetch('/api/profile/check', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    return data.exists;
  };

  const handleSubmit = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setFormErrors({});
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
    const isValidPassword = form.password.length >= 6;

    if (!isValidEmail) {
      setFormErrors((prev) => ({ ...prev, email: 'Invalid email address' }));
      setSubmitting(false);
      return;
    }

    if (!isValidPassword) {
      setFormErrors((prev) => ({ ...prev, password: 'Password must be at least 6 characters' }));
      setSubmitting(false);
      return;
    }

    const exists = await checkUserProfile(form.email);
    if (exists) {
      setFormErrors((prev) => ({ ...prev, email: 'User already exists' }));
      setSubmitting(false);
      return;
    }

    setAuthData(form);
    setSignUpMode('credentials');
    setSubmitting(false);
    router.push('/auth/onboarding');
  };

  if (status === 'loading' || userStatus==null) return <LoaderComponent text="Loading..." />;

  return (
    <div className="flex items-center justify-center min-h-[80vh] px-4">
      <div className="w-full max-w-sm space-y-6 p-6 rounded-lg shadow bg-white dark:bg-backgroundC-dark">
        <h1 className="text-2xl font-semibold text-center">
          Join LinkedIn now — it&apos;s free!
        </h1>

        <SignUpForm
          email={form.email}
          password={form.password}
          formErrors={formErrors}
          onEmailChange={(val) => setForm({ ...form, email: val })}
          onPasswordChange={(val) => setForm({ ...form, password: val })}
          onSubmit={handleSubmit}
          submitting={submitting}
        />

        <div className="flex items-center justify-center gap-2 text-sm">
          <div className="h-px flex-1 object-theme" />
          <span>or</span>
          <div className="h-px flex-1 object-theme" />
        </div>

        <SignUpGoogle
          onGoogleClick={() => {
            setSignUpMode('google');
            signIn('google');
          }}
        />
      </div>
    </div>
  );
}
