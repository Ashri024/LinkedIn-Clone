'use client';

import { signOut, useSession } from 'next-auth/react';
import { useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

interface StepOneProps {
  onNext: () => void;
}

export default function StepOne({ onNext }: StepOneProps) {
  const {
    register,
    trigger,
    formState: { errors },
  } = useFormContext();
  const {data:session} = useSession();
  const router = useRouter();
  const handleNext = async () => {
    const valid = await trigger(['email', 'firstName', 'lastName']);
    if (valid) onNext();
  };

  const handleBack = () => {
    console.log("SIgnUp Mode:", session?.user);
    if (session?.user.authProvider === 'google') {
      signOut();
    } else {
      router.push('/auth/signup');
    }
  };

  return (
    <div className="space-y-6">

      <div className='space-y-2'>
        {/* Email */}
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-sm font-medium">Email</label>
          <Input
            id="email"
            disabled
            {...register('email')}
            className="disabled:opacity-70"
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message as string}</p>
          )}
        </div>

        {/* First Name */}
        <div className="flex flex-col gap-1">
          <label htmlFor="firstName" className="text-sm font-medium">First Name</label>
          <Input id="firstName" {...register('firstName')} />
          {errors.firstName && (
            <p className="text-sm text-red-500">{errors.firstName.message as string}</p>
          )}
        </div>

        {/* Last Name */}
        <div className="flex flex-col gap-1">
          <label htmlFor="lastName" className="text-sm font-medium">Last Name</label>
          <Input id="lastName" {...register('lastName')} />
          {errors.lastName && (
            <p className="text-sm text-red-500">{errors.lastName.message as string}</p>
          )}
        </div>
      </div>
      {/* Actions */}
      <div className="flex justify-between">
        <Button variant="destructive" type="button" onClick={handleBack}>
          Back
        </Button>
        <Button type="button" onClick={handleNext}>
          Next
        </Button>
      </div>
    </div>
  );
}
