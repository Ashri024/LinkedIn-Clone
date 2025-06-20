'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FormEvent } from 'react';

interface SignUpFormProps {
  email: string;
  password: string;
  formErrors: {
    email?: string;
    password?: string;
  };
  onEmailChange: (val: string) => void;
  onPasswordChange: (val: string) => void;
  onSubmit: (e: FormEvent<HTMLButtonElement>) => void;
}

export function SignUpForm({
  email,
  password,
  formErrors,
  onEmailChange,
  onPasswordChange,
  onSubmit,
}: SignUpFormProps) {
  return (
    <div className='space-y-6'>
        <div className="space-y-2">
        <Input
            type="email"
            placeholder="Email or phone number"
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

        <p className="text-xs text-center text-muted-foreground">
            By clicking Continue, you agree to the LinkedIn{' '}
            <a href="#" className="text-blue-600 hover:underline">User Agreement</a>,{' '}
            <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a> and{' '}
            <a href="#" className="text-blue-600 hover:underline">Cookie Policy</a>.
        </p>

        <Button className="w-full" onClick={onSubmit}>
            Agree & Join
        </Button>
    </div>
  );
}
