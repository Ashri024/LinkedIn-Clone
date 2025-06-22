'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface StepEmailVerificationProps {
  email: string;
  onConfirm: (code: string) => void;
  onResend: () => void;
}

export default function StepEmailVerification({
  email,
  onConfirm,
  onResend,
}: StepEmailVerificationProps) {
  const [code, setCode] = useState('');

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-center">Confirm your email</h2>
      <p className="text-sm text-center text-muted-foreground">
        Type in the code we sent to <strong>{email}</strong>.{' '}
        <span className="text-blue-500 hover:underline cursor-pointer" onClick={onResend}>
          Edit email
        </span>
      </p>

      <div className="flex justify-center">
        <Input
          type="text"
          inputMode="numeric"
          pattern="\d*"
          placeholder="______"
          maxLength={6}
          className="text-center text-2xl tracking-widest w-40"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
      </div>

      <div className="text-xs text-center text-gray-500 px-4">
        <p>Your privacy is important.</p>
        <p>
          We may send you updates, job suggestions, invitations, or messages.
        </p>
      </div>

      <div className="text-center text-sm">
        Didn&apos;t receive the code?{' '}
        <Button className="text-blue-600 hover:underline" onClick={onResend}>
          Send again
        </Button>
      </div>

      <Button
        className="w-full"
        disabled={code.length !== 6}
        onClick={() => onConfirm(code)}
      >
        Agree & Confirm
      </Button>
    </div>
  );
}
