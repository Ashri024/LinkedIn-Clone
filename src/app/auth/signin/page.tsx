'use client';

import { useState, useEffect, FormEvent } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { SignInForm } from '@/components/auth/signin/SignInForm';
import { SignInGoogle } from '@/components/auth/signin/SignInGoogle';
import LoaderComponent from '@/components/LoaderComponent';
import toast from 'react-hot-toast';

export default function SignInPage() {
  const router = useRouter();
  const { data: session , status} = useSession();

  const [form, setForm] = useState({ email: '', password: '' });
  const [formErrors, setFormErrors] = useState<{ email?: string; password?: string; general?: string }>({});
  const [submitting, setSubmitting] = useState(false);

  const handleCredentialsLogin = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setFormErrors({});
    setSubmitting(true);

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

    const result = await signIn('credentials', {
      redirect: false,
      email: form.email,
      password: form.password,
    });
    setSubmitting(false);
    
    if (result?.ok) {
      toast.success('Successfully signed in');
      router.push('/');
    } else {
      toast.error('Invalid email or password');
    }
  };

  useEffect(() => {
    if (status === 'loading') return; // Wait for session to load
    
    const checkAndRedirect = async () => {
      console.log("Session authstep /signup:", session?.user?.authStep);

      if(session?.user?.authStep===undefined) {
        return;
      };
        if(session?.user?.authStep >= 1 && session?.user?.authStep <= 4) {
          router.replace('/auth/onboarding/more-details');
          return;
        } else if (session?.user?.authStep ===0) {
          router.replace('/auth/onboarding');
          return;
        } else if (session?.user?.authStep === 5) {
          router.replace('/feed');
          return;
        }
    };
    checkAndRedirect();
  }, [router, session?.user?.authStep, status]);

  if (status === 'loading') {
    return <LoaderComponent  />;
  }

  return (
    <div className="flex items-center justify-center min-h-[80vh] px-4 text-black dark:text-white">
      <div className="w-full max-w-sm space-y-6 p-6 rounded-lg shadow bg-white dark:bg-backgroundC-dark">
        <h1 className="text-2xl font-semibold text-center">Welcome back to LinkedIn</h1>

        <SignInForm
          email={form.email}
          password={form.password}
          loading={submitting}
          formErrors={formErrors}
          onEmailChange={(val) => setForm({ ...form, email: val })}
          onPasswordChange={(val) => setForm({ ...form, password: val })}
          onSubmit={handleCredentialsLogin}
          generalError={formErrors.general}
        />

        <div className="flex items-center justify-center gap-2 text-sm">
          <div className="h-px flex-1 object-theme" />
          <span>or</span>
          <div className="h-px flex-1 object-theme" />
        </div>
        <SignInGoogle
          onGoogleClick={() => signIn('google')}
        />
      </div>
    </div>
  );
}
