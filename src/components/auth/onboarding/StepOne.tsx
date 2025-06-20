'use client';

import { useFormContext } from 'react-hook-form';
import { useAuthStore } from '@/store/authStore';

export default function StepOne({ onNext }: { onNext: () => void }) {
  const {
    register,
    trigger,
    formState: { errors },
  } = useFormContext();
  const { signUpMode } = useAuthStore();

  const handleNext = async () => {
    const valid = await trigger(['email', 'firstName', 'lastName']);
    if (valid) onNext();
  };

  return (
    <div className="space-y-4">
      <div>
        <label>Email</label>
        <input
          {...register('email')}
          className="input w-full disabled:bg-gray-200"
          disabled={signUpMode === 'credentials'}
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message as string}</p>
        )}
      </div>

      <div>
        <label>First Name</label>
        <input {...register('firstName')} className="input w-full" />
        {errors.firstName && (
          <p className="text-red-500 text-sm">{errors.firstName.message as string}</p>
        )}
      </div>

      <div>
        <label>Last Name</label>
        <input {...register('lastName')} className="input w-full" />
        {errors.lastName && (
          <p className="text-red-500 text-sm">{errors.lastName.message as string}</p>
        )}
      </div>

      <button
        type="button"
        onClick={handleNext}
        className="btn bg-blue-500 text-white px-4 py-2 rounded"
      >
        Next
      </button>
    </div>
  );
}
