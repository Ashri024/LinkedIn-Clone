'use client';

import { useState, useEffect, FormEvent } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { SignUpForm } from '@/components/auth/signup/SignUpForm';
import { SignUpGoogle } from '@/components/auth/signup/SignUpGoogle';
import LoaderComponent from '@/components/LoaderComponent';
import { checkUserProfile } from '@/lib/db/frontend/user';
import toast from 'react-hot-toast'; 

export default function SignUpPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [form, setForm] = useState({ email: '', password: '' });
  const [formErrors, setFormErrors] = useState<{ email?: string; password?: string }>({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const setAuthData = useAuthStore((state) => state.setAuthData);
  const setSignUpMode = useAuthStore((state) => state.setSignUpMode);

  useEffect(() => {
    setAuthData({ email: '', password: '' });
  }, [setAuthData]);

  const handleSubmit = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setFormErrors({});
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
    const isValidPassword = form.password.length >= 6;

    if (!isValidEmail) {
      toast.error('Invalid email address');
      setSubmitting(false);
      return;
    }
    
    if (!isValidPassword) {
      toast.error('Password must be at least 6 characters');
      setSubmitting(false);
      return;
    }
    
    try {
      const exists = await checkUserProfile(form.email);
      if (exists) {
        toast.error('User already exists');
        setSubmitting(false);
        return;
      }
    
      setAuthData(form);
      setSignUpMode('credentials');
      router.push('/auth/onboarding');
    } catch (error) {
      console.error('Signup error:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    const checkAndRedirect = async () => {
      if (status === 'loading') return;
      setLoading(true);
      const hasProfile = await checkUserProfile(session?.user.email);
        console.log('User exists after session check:', hasProfile);
        if(hasProfile >= 1 && hasProfile <= 4) {
          router.replace('/auth/onboarding/more-details');
          return;
        } else if (hasProfile ===0) {
          router.replace('/auth/onboarding');
          return;
        } else if (hasProfile === 5) {
          router.replace('/profile');
          return;
        }
        setLoading(false);
    };
    checkAndRedirect();
  }, [session?.user?.email, router, status]);

  if (loading || status === 'loading') {
    return <LoaderComponent text='Checking Profile Status...'/>
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
