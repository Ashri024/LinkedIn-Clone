'use client';

import { useState, useEffect, FormEvent } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { SignUpForm } from '@/components/auth/signup/SignUpForm';
import { SignUpGoogle } from '@/components/auth/signup/SignUpGoogle';
import LoaderComponent from '@/components/LoaderComponent';

export default function SignUpPage() {
  const { data: session } = useSession();
  const router = useRouter();

  const [form, setForm] = useState({ email: '', password: '' });
  const [formErrors, setFormErrors] = useState<{ email?: string; password?: string }>({});
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const setAuthData = useAuthStore((state) => state.setAuthData);
  const setSignUpMode = useAuthStore((state) => state.setSignUpMode);

  useEffect(() => {
    setAuthData({ email: '', password: '' });
  }, [setAuthData]);

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

  useEffect(() => {
    const checkAndRedirect = async () => {
      if (session?.user?.email) {
        setLoading(true);
        const hasProfile = await checkUserProfile(session.user.email);
        router.replace(hasProfile ? '/' : '/auth/onboarding');
      }
    };
    checkAndRedirect();
  }, [session, router]);

  if (loading){
    return <LoaderComponent text='Checking Profile...'/>
  }

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
