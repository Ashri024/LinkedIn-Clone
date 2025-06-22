'use client';

import LoaderComponent from '@/components/LoaderComponent';
import { Button } from '@/components/ui/button';
import { checkUserProfile } from '@/lib/db/frontend/user';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const OPTIONS = [
  "Yes, I'm actively looking for a new job",
  "Not really, but would consider the right opportunity",
  "No, I'm not interested in any job opportunity"
];

const OPTION_VALUES = ['yes', 'maybe', 'no'] as const;

export default function StepJobPreference() {
  const [selected, setSelected] = useState<number | null>(0);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    const checkAndRedirect = async () => {
      console.log("Current user:", session?.user);
      setLoading(true);
      const hasProfile = await checkUserProfile(session?.user.email);
      
      if(hasProfile !== 4 && session?.user?.authProvider === 'credentials') {
        router.replace('/auth/onboarding/more-details');
        return;
      }
      if(hasProfile !== 3 && session?.user?.authProvider === 'google') {
        router.replace('/auth/onboarding/more-details');
        return;
      }

      setLoading(false);
    };
    checkAndRedirect();
  }, [session, status, router]);

  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    if (selected === null) return;

    const value = OPTION_VALUES[selected];
    
    try {
      const res = await fetch('/api/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lookingForJob: value,
          authStep: 5,
        }),
      });
      console.log('Response gotten:', res);

      if (!res.ok) throw new Error('Failed to update');

      router.push('/profile');
      
    } catch (err) {
      console.error(err);
      alert('Something went wrong while saving your preference.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading || status === 'loading') {
    return <LoaderComponent text="Checking Profile Status..." />;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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
        <Button type='submit' className="w-full" disabled={selected === null || submitting}>
          {submitting ? 'Saving...' : 'Save Preference'}
        </Button>
      </div>
    </form>
  );
}
