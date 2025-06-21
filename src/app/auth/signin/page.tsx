'use client';

import { useState, useEffect, FormEvent, useContext } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { SignInForm } from '@/components/auth/signin/SignInForm';
import { SignInGoogle } from '@/components/auth/signin/SignInGoogle';
import { UserStatusContext } from '@/lib/context/UserStatusContext';
import LoaderComponent from '@/components/LoaderComponent';

export default function SignInPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { userStatus } = useContext(UserStatusContext);

  const [form, setForm] = useState({ email: '', password: '' });
  const [formErrors, setFormErrors] = useState<{ email?: string; password?: string; general?: string }>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userStatus === 2) router.replace('/');
    if (userStatus === 1) router.replace('/auth/onboarding/more-details');
    if (userStatus === 0 && session?.user?.email) {
      router.replace('/auth/onboarding');
    }
  }, [userStatus, router, session]);

  const handleCredentialsLogin = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setFormErrors({});

    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
    const isValidPassword = form.password.length >= 6;

    if (!isValidEmail) {
      setFormErrors((prev) => ({ ...prev, email: 'Invalid email address' }));
      return;
    }

    if (!isValidPassword) {
      setFormErrors((prev) => ({ ...prev, password: 'Password must be at least 6 characters' }));
      return;
    }

    setLoading(true);
    const result = await signIn('credentials', {
      redirect: false,
      email: form.email,
      password: form.password,
    });
    setLoading(false);

    if (result?.ok) {
      router.push('/');
    } else {
      setFormErrors({ general: 'Invalid email or password' });
    }
  };

  if (status === 'loading' || userStatus==null) return <LoaderComponent text="Loading..." />;

  return (
    <div className="flex items-center justify-center min-h-[80vh] px-4 text-black dark:text-white">
      <div className="w-full max-w-sm space-y-6 p-6 rounded-lg shadow bg-white dark:bg-backgroundC-dark">
        <h1 className="text-2xl font-semibold text-center">Welcome back to LinkedIn</h1>

        <SignInForm
          email={form.email}
          password={form.password}
          loading={loading}
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
