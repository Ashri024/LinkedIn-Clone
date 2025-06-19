'use client';

import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function SignInPage() {
  const router = useRouter();
  const { data: session } = useSession();

  const [form, setForm] = useState({ email: '', password: '' });
  const [formErrors, setFormErrors] = useState<{ email?: string; password?: string; general?: string }>({});
  const [loading, setLoading] = useState(false);

  const handleCredentialsLogin = async () => {
    setFormErrors({}); // Reset errors

    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
    const isValidPassword = form.password.length >= 6;

    if (!isValidEmail) {
      setFormErrors({ email: 'Invalid email address' });
      return;
    }

    if (!isValidPassword) {
      setFormErrors({ password: 'Password must be at least 6 characters' });
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

  useEffect(() => {
    if (session?.user?.email) {
      router.replace('/');
    }
  }, [session,router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-8 rounded shadow max-w-sm w-full">
        <h2 className="text-2xl font-bold mb-4 text-center">Welcome back to LinkedIn</h2>

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
        {formErrors.password && <p className="text-red-500 text-sm mb-2">{formErrors.password}</p>}

        <button
          onClick={handleCredentialsLogin}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded mb-4"
          disabled={loading}
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </button>

        <button
          onClick={() => signIn('google')}
          className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded mb-4"
        >
          Continue with Google
        </button>

        {formErrors.general && (
          <p className="text-red-500 text-sm text-center mb-4">{formErrors.general}</p>
        )}

        <div className="text-center text-gray-500 text-sm mb-4">
          By continuing, you agree to our Terms & Privacy Policy.
        </div>

        <div className="text-center text-sm text-gray-600">
          Don&apos;t have an account?{' '}
          <Link href="/auth/signup" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
