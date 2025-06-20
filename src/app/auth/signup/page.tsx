'use client';

import { useState, useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { FcGoogle } from "react-icons/fc";

export default function SignUpPage() {
  const { data: session } = useSession();
  const router = useRouter();

  const [form, setForm] = useState({ email: '', password: '' });
  const [formErrors, setFormErrors] = useState<{ email?: string; password?: string }>({});
  const [loading, setLoading] = useState(false);

  const setAuthData = useAuthStore((state) => state.setAuthData);
  const setSignUpMode = useAuthStore((state) => state.setSignUpMode);

  useEffect(() => {
    setAuthData({ email: '', password: '' }); // reset on mount
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

  const handleSubmit = async () => {
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

    const exists = await checkUserProfile(form.email);
    if (exists) {
      setFormErrors((prev) => ({ ...prev, email: 'User already exists' }));
      return;
    }

    setAuthData(form);
    setSignUpMode('credentials');
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

  return (
    <div className="flex items-center justify-center min-h-[80vh] px-4">
      <div className="w-full max-w-sm space-y-6 p-6 rounded-lg shadow  bg-white dark:bg-backgroundC-dark">
        <h1 className="text-2xl font-semibold text-center">Join LinkedIn now — it&apos;s free!</h1>

        <div className="space-y-2">
          <Input
            type="email"
            placeholder="Email or phone number"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          {formErrors.email && <p className="text-sm text-red-500">{formErrors.email}</p>}

          <Input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          {formErrors.password && <p className="text-sm text-red-500">{formErrors.password}</p>}
        </div>

        <p className="text-xs text-center text-muted-foreground">
          By clicking Continue, you agree to the LinkedIn{' '}
          <Link href="#" className="text-blue-600 hover:underline">
            User Agreement
          </Link>
          ,{' '}
          <Link href="#" className="text-blue-600 hover:underline">
            Privacy Policy
          </Link>{' '}
          and{' '}
          <Link href="#" className="text-blue-600 hover:underline">
            Cookie Policy
          </Link>
          .
        </p>

        <Button
          className="w-full "
          onClick={handleSubmit}
        >
          Agree & Join
        </Button>

        <div className="flex items-center justify-center gap-2 text-sm ">
          <div className="h-px flex-1 object-theme" />
          <span>or</span>
          <div className="h-px flex-1 object-theme" />
        </div>

        <Button
          variant="outline"
          className="w-full border-slate-500 "
          onClick={() => {
            setSignUpMode('google');
            signIn('google');
          }}
        >
          <FcGoogle className="mr-0 size-5" />
          Continue with Google
        </Button>

        <p className="text-center text-sm">
          Already on LinkedIn?{' '}
          <Link href="/auth/signin" className="text-purple-600 hover:underline">
            Sign in
          </Link>
        </p>

        {loading && (
          <p className="text-sm text-center text-muted-foreground">Checking profile...</p>
        )}
      </div>
    </div>
  );
}
