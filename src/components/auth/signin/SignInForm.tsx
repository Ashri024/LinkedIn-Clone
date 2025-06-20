// components/auth/SignInForm.tsx
'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FormEvent } from 'react';

interface SignInFormProps {
  email: string;
  password: string;
  loading: boolean;
  formErrors: {
    email?: string;
    password?: string;
  };
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onSubmit: (e: FormEvent<HTMLButtonElement>) => void;
}

export function SignInForm({
  email,
  password,
  loading,
  formErrors,
  onEmailChange,
  onPasswordChange,
  onSubmit,
}: SignInFormProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
        />
        {formErrors.email && <p className="text-sm text-red-500">{formErrors.email}</p>}

        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => onPasswordChange(e.target.value)}
        />
        {formErrors.password && <p className="text-sm text-red-500">{formErrors.password}</p>}
      </div>
      
        <Button onClick={onSubmit} className="w-full" disabled={loading}>
          {loading ? 'Signing in...' : 'Sign In'}
        </Button>
      </div>
  );
}
