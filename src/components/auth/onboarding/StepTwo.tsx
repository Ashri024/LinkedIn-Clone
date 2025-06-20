'use client';

import { useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface StepTwoProps {
  onBack: () => void;
  isSubmitting: boolean;
}

export default function StepTwo({ onBack, isSubmitting }: StepTwoProps) {
  const {
    register,
    formState: { errors }
  } = useFormContext();

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        {/* Phone */}
        <div className="flex flex-col gap-1">
          <label htmlFor="phone" className="text-sm font-medium">
            Phone Number
          </label>
          <Input
            id="phone"
            placeholder="10-digit number"
            {...register('phone')}
          />
          {typeof errors.phone?.message === 'string' && (
            <p className="text-sm text-red-500">{errors.phone.message}</p>
          )}
        </div>

        {/* Country */}
        <div className="flex flex-col gap-1">
          <label htmlFor="country" className="text-sm font-medium">
            Country
          </label>
          <Input id="country" {...register('country')} />
          {typeof errors.country?.message === 'string' && (
            <p className="text-sm text-red-500">{errors.country.message}</p>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between">
        <Button variant="outline" type="button" onClick={onBack}>
          Back
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </Button>
      </div>
    </div>
  );
}
