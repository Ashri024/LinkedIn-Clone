'use client';

import { Button } from '@/components/ui/button';
import { useState } from 'react';

const OPTIONS = [
  "Yes, I'm actively looking for a new job",
  "Not really, but would consider the right opportunity",
  "No, I'm not interested in any job opportunity"
];

export default function JobPreferencePage() {
  const [selected, setSelected] = useState<number | null>(0);

  return (
    <>
      <h2 className="text-2xl font-semibold text-center">Are you looking for a job?</h2>
      <p className="text-sm text-center text-muted-foreground mb-4">
        Your response is only visible to you.
      </p>

      <div className="space-y-3">
        {OPTIONS.map((option, index) => (
          <label
            key={index}
            className={`flex items-center border rounded-md px-4 py-3 cursor-pointer gap-3 ${
              selected === index
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                : 'border-gray-300 dark:border-gray-600'
            }`}
          >
            <input
              type="radio"
              name="jobPreference"
              checked={selected === index}
              onChange={() => setSelected(index)}
              className="accent-blue-600"
            />
            <span className="text-sm">{option}</span>
          </label>
        ))}
      </div>

      <div className="pt-6">
        <Button className="w-full" disabled={selected === null}>
          Next
        </Button>
      </div>
    </>
  );
}
