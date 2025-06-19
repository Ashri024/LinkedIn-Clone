'use client';

import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function SignInPage() {
  const router = useRouter();
  const { data: session } = useSession();

  const [loading, setLoading] = useState(false);

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
  }, [session,router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-8 rounded shadow max-w-sm w-full">
        <h2 className="text-2xl font-bold mb-4 text-center">Sign in to LinkedIn</h2>

        <button
          onClick={() => signIn('google')}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded mb-4"
        >
          Continue with Google
        </button>

        <div className="text-center text-gray-500 text-sm">
          By continuing, you agree to our Terms & Privacy Policy.
        </div>

        {loading && <p className="text-sm text-center mt-4 text-gray-500">Checking profile...</p>}
      </div>
    </div>
  );
}
