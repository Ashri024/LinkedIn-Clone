'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function EmailVerificationPage() {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <>
      <h2 className="text-2xl font-semibold text-center">Confirm your email</h2>
      <p className="text-sm text-center text-gray-600 dark:text-gray-300 mb-4">
        Type in the code we sent to <strong>{session?.user?.email}</strong>.
      </p>

      <Input placeholder="Enter verification code" />

      <p className="text-xs text-gray-500 mt-2 text-center">
        Didn&apos;t receive the code? <span className="underline cursor-pointer">Send again</span>
      </p>

      <div className="pt-6">
        <Button className="w-full" onClick={() => router.push('/auth/onboarding/more-details/profile-job-preference')}>
          Agree & Confirm
        </Button>
      </div>
    </>
  );
}
