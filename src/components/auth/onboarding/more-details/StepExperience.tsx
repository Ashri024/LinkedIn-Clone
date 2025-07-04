'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useSession } from 'next-auth/react';

const schema = z.object({
  title: z.string().min(2, "Job title is required"),
  company: z.string().min(2, "Company name is required"),
  employmentType: z.enum(['full time', 'part time', 'internship', 'freelance']),
});

type EmploymentType = z.infer<typeof schema.shape.employmentType>;
type FormData = z.infer<typeof schema>;

interface Props {
  onStudentToggle: () => void;
}

export default function StepExperience({ onStudentToggle }: Props) {
  const router = useRouter();
  const {data: session, update} = useSession();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onChange', // This will trigger validation on change
  });

  // Watch all form values to check if form is valid
  const watchedValues = watch();
  const isFormValid = isValid && 
    watchedValues.title && 
    watchedValues.company && 
    watchedValues.employmentType;

  const onSubmit = async (data: FormData) => {
    try {
      const payload = {
        companyId: '000000000000000000000000', // Replace with actual logic
        employmentType: data.employmentType,
        positions: [
          {
            title: data.title,
          },
        ],
      };
      const res = await fetch('/api/experience', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
      // const experienceData = await res.json();
      // console.log('Experience submission response:', experienceData);
      if (!res.ok) {
        toast.error('Failed to save experience');
        return;
      };
      
      const profileUpdateRes = await fetch('/api/profile', {
        method: 'PATCH',
        body: JSON.stringify({ 
          authStep: 3,  
          headline: 'Worked at ' + data.company,
          workingAt: data.company,
        }),
      }); 
      if (!profileUpdateRes.ok) {
        toast.error('Failed to update profile step');
        return;
      }
      await update(); // Refresh session data
      toast.success('Experience saved successfully');
      if(session?.user?.authProvider === 'credentials') {
      router.push('/auth/onboarding/more-details/profile-email-verification');
      } else {
        router.push('/auth/onboarding/more-details/profile-job-preference');
      }
    } catch (err) {
      console.error('Experience submission error:', err);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-2xl font-medium text-center">What&apos;s your most recent experience?</h2>

      <div className="space-y-4">
        <div>
          <label className="text-sm text-gray-300 mb-1 block">Most recent job title *</label>
          <Input placeholder="e.g. Project Manager" {...register('title')} />
          {errors.title && <p className="text-sm text-red-500 mt-1">{errors.title.message}</p>}
        </div>

        <div>
          <label className="text-sm text-gray-300 mb-1 block">Employment type *</label>
          <Select onValueChange={(val) => setValue('employmentType', val as EmploymentType)}>
            <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="full time">Full-time</SelectItem>
              <SelectItem value="part time">Part-time</SelectItem>
              <SelectItem value="internship">Internship</SelectItem>
              <SelectItem value="freelance">Freelance</SelectItem>
            </SelectContent>
          </Select>
          {errors.employmentType && <p className="text-sm text-red-500 mt-1">{errors.employmentType.message}</p>}
        </div>

        <div>
          <label className="text-sm text-gray-300 mb-1 block">Most recent company *</label>
          <Input placeholder="e.g. My own startup" {...register('company')} />
          {errors.company && <p className="text-sm text-red-500 mt-1">{errors.company.message}</p>}
        </div>
      <Button variant="link" className="w-full" type="button" onClick={onStudentToggle}>
        I&apos;m a student
      </Button>
      </div>


      <Button type="submit" className="w-full" disabled={isSubmitting || !isFormValid}>
        Continue
      </Button>
    </form>
  );
}
