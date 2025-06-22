'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface Props {
  onNext: (preference: string) => void;
}

const options = [
  'Yes, I’m actively looking for a new job',
  'Not really, but would consider the right opportunity',
  'No, I’m not interested in any job opportunity',
];

export default function StepJobPreference({ onNext }: Props) {
  const [selected, setSelected] = useState<string | null>(options[0]);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-center">Are you looking for a job?</h2>
      <p className="text-sm text-muted-foreground text-center">
        Your response is only visible to you.
      </p>

      <div className="space-y-3">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            className={`w-full border px-4 py-2 rounded-md text-left ${
              selected === option
                ? 'border-primary text-primary bg-primary/10'
                : 'border-gray-300 hover:bg-muted'
            }`}
            onClick={() => setSelected(option)}
          >
            {option}
          </button>
        ))}
      </div>

      <Button
        className="w-full mt-4"
        disabled={!selected}
        onClick={() => selected && onNext(selected)}
      >
        Next
      </Button>
    </div>
  );
}
