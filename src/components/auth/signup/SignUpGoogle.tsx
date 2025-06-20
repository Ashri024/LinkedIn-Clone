'use client';

import { Button } from '@/components/ui/button';
import { FcGoogle } from 'react-icons/fc';
import Link from 'next/link';

interface SignUpGoogleProps {
  onGoogleClick: () => void;
}

export function SignUpGoogle({ onGoogleClick }: SignUpGoogleProps) {
    
  return (
    <>
      <Button
        variant="outline"
        className="w-full border-slate-500"
        onClick={onGoogleClick}
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

    </>
  );
}
