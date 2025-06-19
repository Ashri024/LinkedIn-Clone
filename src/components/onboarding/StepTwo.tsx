'use client';

import { useFormContext } from 'react-hook-form';

interface Props {
  onBack: () => void;
  isSubmitting: boolean;
}

export default function StepTwo({ onBack, isSubmitting }: Props) {
  const {
    register,
    formState: { errors }
  } = useFormContext();

  return (
    <div className="space-y-4" >
      <div>
        <label>Phone Number</label>
        <input
          {...register('phone')}
          className="input w-full"
          placeholder="10-digit number"
        />
       {typeof errors.phone?.message === 'string' && ( <p className="text-red-500 text-sm">{errors.phone.message}</p> )}
      </div>

      <div>
        <label>Country</label>
        <input {...register('country')} className="input w-full" />
        {typeof errors.country?.message === 'string' && ( <p className="text-red-500 text-sm">{errors.country.message}</p> )}
      </div>

      <div className="flex justify-between mt-4">
        <button
          type="button"
          className="btn bg-gray-300 text-black px-4 py-2 rounded"
          onClick={onBack}
        >
          Back
        </button>
        <button
          type="submit"
          className="btn bg-green-600 text-white px-4 py-2 rounded disabled:bg-gray-500 hover:bg-green-900"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </div>
    </div>
  );
}


