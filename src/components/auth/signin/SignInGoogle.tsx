// components/auth/SignInGoogle.tsx
'use client';

import { Button } from '@/components/ui/button';
import { FcGoogle } from 'react-icons/fc';
import Link from 'next/link';

interface SignInGoogleProps {
  onGoogleClick: () => void;
}

export function SignInGoogle({ onGoogleClick }: SignInGoogleProps) {
  return (
    <>
      <Button variant="outline" className="w-full border-slate-500" onClick={onGoogleClick}>
        <FcGoogle className="mr-0 size-5" />
        Continue with Google
      </Button>

      <p className="text-xs text-center text-muted-foreground">
        By continuing, you agree to the LinkedIn{' '}
        <Link href="#" className="text-blue-600 hover:underline">Terms</Link> and{' '}
        <Link href="#" className="text-blue-600 hover:underline">Privacy Policy</Link>.
      </p>

      <p className="text-center text-sm">
        Don&apos;t have an account?{' '}
        <Link href="/auth/signup" className="text-purple-600 hover:underline">Sign up</Link>
      </p>
    </>
  );
}
