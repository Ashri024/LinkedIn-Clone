'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';
// import LoaderComponent from '@/components/LoaderComponent';

export default function StepLocation() {
  const [location, setLocation] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();
  const { data: session, status, update } = useSession();

  // Check authStep === 1
  useEffect(() => {
  if (status === 'loading') return; // Wait for session to load
    const checkAndRedirect = async () => {
      // console.log("Authstep in /profile-location:", session?.user?.authStep);
      if(session?.user?.authStep !== 1) {
        // console.log("/STEP-LOCATION: NOT EQUALS TO 1 IN PROFILE-LOCATION")
        router.replace('/auth/onboarding/more-details');
        return;
      }
  };
  checkAndRedirect();
  }, [status, router, session?.user?.authStep]);

  const handleNext = async () => {
    if (!location.trim()) {
      toast.error('Location cannot be empty');
      return;
    }
    if (location.length > 100) {
      toast.error('Location name is too long');
      return;
    }
    setSubmitting(true);
    const res = await fetch('/api/profile', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        location: { city: location },
        authStep: 2, // move to next step
      }),
    });

    if (res.ok) {
      router.push('/auth/onboarding/more-details/profile-experience');
      await update();
      toast.success('Location updated successfully');
    } else {
      const data = await res.json();
      toast.error(data.message || 'Something went wrong');
    }
  setSubmitting(false);
  };
  // if (status === 'loading') {
  //   return <LoaderComponent  />;
  // }

  return (
    <form className="space-y-6">
      <h2 className="text-2xl font-semibold text-center">What&apos;s your location?</h2>
      <p className="text-sm text-center text-muted-foreground">
        See people, jobs, and news in your area.
      </p>

      <div className="space-y-2">
        <label htmlFor="location" className="text-sm font-medium">Location *</label>
        <Input
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="e.g. Prayagraj, Uttar Pradesh, India"
          required
        />
      </div>

      <Button type='submit' className="w-full" onClick={handleNext} disabled={submitting}>
        {submitting ? 'Saving...' : 'Next'}
      </Button>
    </form>
  );
}
