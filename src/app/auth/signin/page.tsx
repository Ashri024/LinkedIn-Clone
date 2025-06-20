'use client';

import { useState, useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';

export default function SignInPage() {
  const router = useRouter();
  const { data: session } = useSession();

  const [form, setForm] = useState({ email: '', password: '' });
  const [formErrors, setFormErrors] = useState<{ email?: string; password?: string; general?: string }>({});
  const [loading, setLoading] = useState(false);

  const handleCredentialsLogin = async () => {
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

  useEffect(() => {
    if (session?.user?.email) {
      router.replace('/');
    }
  }, [session, router]);

  return (
    <div className="flex items-center justify-center min-h-[80vh] px-4 text-black dark:text-white">
      <div className="w-full max-w-sm space-y-6 p-6 rounded-lg shadow bg-white dark:bg-backgroundC-dark">
        <h1 className="text-2xl font-semibold text-center">Welcome back to LinkedIn</h1>

        <div className="space-y-2">
          <Input
            type="email"
            placeholder="Email"
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

        <Button onClick={handleCredentialsLogin} className="w-full" disabled={loading}>
          {loading ? 'Signing in...' : 'Sign In'}
        </Button>

        <div className="flex items-center justify-center gap-2 text-sm">
          <div className="h-px flex-1 object-theme" />
          <span>or</span>
          <div className="h-px flex-1 object-theme" />
        </div>

        <Button
          variant="outline"
          className="w-full border-slate-500"
          onClick={() => signIn('google')}
        >
          <FcGoogle className="mr-0 size-5" />
          Continue with Google
        </Button>

        {formErrors.general && (
          <p className="text-red-500 text-sm text-center">{formErrors.general}</p>
        )}

        <p className="text-xs text-center text-muted-foreground">
          By continuing, you agree to the LinkedIn{' '}
          <Link href="#" className="text-blue-600 hover:underline">Terms</Link> and{' '}
          <Link href="#" className="text-blue-600 hover:underline">Privacy Policy</Link>.
        </p>

        <p className="text-center text-sm">
          Don&apos;t have an account?{' '}
          <Link href="/auth/signup" className="text-purple-600 hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
