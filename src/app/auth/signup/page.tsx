'use client';

import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import Link from 'next/link';

export default function SignUpPage() {
  const router = useRouter();
  const { data: session } = useSession();

  const [form, setForm] = useState({ email: '', password: '' });
  const [formErrors, setFormErrors] = useState<{ email?: string; password?: string }>({});
  const [loading, setLoading] = useState(false);

  const setAuthData = useAuthStore((state) => state.setAuthData);
  const setSignUpMode = useAuthStore((state) => state.setSignUpMode);
  useEffect(()=> {
    setAuthData({ email: '', password: '' }); // Reset auth data on mount
},[setAuthData])

  const handleCredentialsSubmit = async () => {
    setFormErrors({}); // Reset errors
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
    const isValidPassword = form.password.length >= 6;
  
    if (!isValidEmail) {
      setFormErrors({ ...formErrors, email: 'Invalid email address' });
      return;
    }
  
    if (!isValidPassword) {
      setFormErrors({ ...formErrors, password: 'Password must be at least 6 characters' });
      return;
    }
    // Check if user already exists
    const userExists = await checkUserProfile(form.email);
    if (userExists) {
      setFormErrors({ ...formErrors, email: 'User already exists' });
      return;
    }
    setAuthData(form);
    setSignUpMode('credentials');
    router.push('/auth/onboarding');
  };

  const checkUserProfile = async (email: string) => {
    const res = await fetch('/api/profile/check', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    return data.exists;
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
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-8 rounded shadow max-w-sm w-full">
        <h2 className="text-2xl font-bold mb-4 text-center">Sign up to LinkedIn</h2>

        <input
          className="input w-full mb-2"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        {formErrors.email && <p className="text-red-500 text-sm mb-2">{formErrors.email}</p>}
        <input
          className="input w-full mb-4"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        {formErrors.password && <p className="text-red-500 text-sm mb-4">{formErrors.password}</p>}
        <button
          onClick={handleCredentialsSubmit}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded mb-4"
        >
          Agree & Join
        </button>

        <button
          onClick={() => {
            setSignUpMode('google');
            signIn('google');
          }}
          className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded mb-4"
        >
          Continue with Google
        </button>

        <div className="text-center text-gray-500 text-sm">
          By continuing, you agree to our Terms & Privacy Policy.
        </div>

        {loading && <p className="text-sm text-center mt-4 text-gray-500">Checking profile...</p>}

        <div className="text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link href="/auth/signin" className="text-blue-600 hover:underline">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
