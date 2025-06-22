'use client';

import StepExperience from '@/components/auth/onboarding/more-details/StepExperience';
import StepStudent from '@/components/auth/onboarding/more-details/StepStudent';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function ProfileExperiencePage() {
  const [isStudent, setIsStudent] = useState(false);
  const router = useRouter();

  return (
    <>
      {isStudent ? (
        <StepStudent onNotStudent={() => setIsStudent(false)} />
      ) : (
        <StepExperience
          onStudentToggle={() => setIsStudent(true)}
        />
      )}

      {/* Consistent Continue Button */}
      <div className="pt-4">
        <Button
          className="w-full"
          onClick={() => router.push('/auth/onboarding/more-details/profile-email-verification')}
        >
          Continue
        </Button>
      </div>
    </>
  );
}
