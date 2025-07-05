'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useRouter } from 'next/navigation';
import { DEGREES, FIELDS_OF_STUDY, YEARS } from '@/constants/select-options.ts';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import toast from 'react-hot-toast';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

const schema = z.object({
  school: z.string().min(2, "School name is required"),
  degree: z.string().min(1, "Degree is required"),
  fieldOfStudy: z.string().min(1, "Field of study is required"),
  startYear: z.coerce.number().min(1900, "Start year is required").max(2100),
  endYear: z.coerce.number().min(1900, "End year is required").max(2100),
  over16: z.boolean(), 
}).refine((data) => data.endYear >= data.startYear, {
  message: "End year must be greater than or equal to start year",
  path: ["endYear"],
});

type FormData = z.infer<typeof schema>;

interface Props {
  onNotStudent: () => void;
}

export default function StepStudent({ onNotStudent }: Props) {
  const router = useRouter();
  const {data:session, update} = useSession();
  const [yearError, setYearError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    trigger,
    formState: { errors, isSubmitting }
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: {
      over16: true, // ✅ set default
    }
  });  

  // Watch all form values to check if form is valid
  const watchedValues = watch();
  const isFormValid = 
    watchedValues.school && 
    watchedValues.school.length >= 2 &&
    watchedValues.degree && 
    watchedValues.degree.length >= 1 &&
    watchedValues.fieldOfStudy && 
    watchedValues.fieldOfStudy.length >= 1 &&
    watchedValues.startYear && 
    watchedValues.startYear >= 1900 &&
    watchedValues.endYear &&
    watchedValues.endYear >= 1900 &&
    watchedValues.endYear >= watchedValues.startYear &&
    Object.keys(errors).length === 0;

  const validateYears = (startYear?: number, endYear?: number) => {
    setYearError(null);
    
    if (startYear && endYear && endYear < startYear) {
      setYearError("End year must be greater than or equal to start year");
    }
  };

  const handleStartYearChange = (val: string) => {
    const startYear = Number(val);
    setValue('startYear', startYear);
    
    // Validate with current end year
    validateYears(startYear, watchedValues.endYear);
    
    // Trigger validation for the startYear field
    trigger('startYear');
  };

  const handleEndYearChange = (val: string) => {
    const endYear = Number(val);
    setValue('endYear', endYear);
    
    // Validate with current start year
    validateYears(watchedValues.startYear, endYear);
    
    // Trigger validation for the endYear field
    trigger('endYear');
  };
      
  const onSubmit = async (data: FormData) => {
    try {
      const payload = {
        school: data.school,
        degree: data.degree,
        fieldOfStudy: data.fieldOfStudy,
        period: {
          start: { year: data.startYear },
          end: { year: data.endYear },
        },
      };

      const res = await fetch('/api/education', {
        method: 'POST',
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        toast.error('Failed to save education details');
        return;
      };

      // Update profile with new education
      const profileUpdateRes = await fetch('/api/profile', {
        method: 'PATCH',
        body: JSON.stringify({ 
          authStep: 3,  
          headline: 'Student at ' + data.school,
          isStudent: true,
          workingAt: data.school,
          over16: data.over16, 
        }),
      });
      if (!profileUpdateRes.ok) {
        toast.error('Failed to update profile step');
        return;
      }
      await profileUpdateRes.json();
      // console.log('Profile updated successfully: ', profileData);
      await update(); // Refresh session data
      toast.success('Education details saved successfully');
      if(session?.user?.authProvider === 'credentials') {
      router.push('/auth/onboarding/more-details/profile-email-verification');
      } else {
        router.push('/auth/onboarding/more-details/profile-job-preference');
      }

    } catch (err) {
      console.error('Education submission error:', err);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-2xl font-semibold text-center">What&apos;s your most recent experience?</h2>

      <div className="space-y-4">
        <div>
          <label className="text-sm text-gray-300 mb-1 block">School or College/University *</label>
          <Input placeholder="Enter your institution" {...register('school')} />
          {errors.school && <p className="text-sm text-red-500 mt-1">{errors.school.message}</p>}
        </div>

        <div>
          <label className="text-sm text-gray-300 mb-1 block">Degree *</label>
          <Select onValueChange={(val) => setValue('degree', val)}>
            <SelectTrigger><SelectValue placeholder="e.g. B.Tech, MBA" /></SelectTrigger>
            <SelectContent>
              {DEGREES.map((deg) => <SelectItem key={deg} value={deg}>{deg}</SelectItem>)}
            </SelectContent>
          </Select>
          {errors.degree && <p className="text-sm text-red-500 mt-1">{errors.degree.message}</p>}
        </div>

        <div>
          <label className="text-sm text-gray-300 mb-1 block">Field of Study *</label>
          <Select onValueChange={(val) => setValue('fieldOfStudy', val)}>
            <SelectTrigger><SelectValue placeholder="e.g. Computer Science" /></SelectTrigger>
            <SelectContent>
              {FIELDS_OF_STUDY.map((field) => <SelectItem key={field} value={field}>{field}</SelectItem>)}
            </SelectContent>
          </Select>
          {errors.fieldOfStudy && <p className="text-sm text-red-500 mt-1">{errors.fieldOfStudy.message}</p>}
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <label className="text-sm text-gray-300 mb-1 block">Start Year *</label>
            <Select onValueChange={handleStartYearChange}>
              <SelectTrigger><SelectValue placeholder="Select year" /></SelectTrigger>
              <SelectContent>
                {YEARS.map((y) => <SelectItem key={y} value={String(y)}>{y}</SelectItem>)}
              </SelectContent>
            </Select>
            {errors.startYear && <p className="text-sm text-red-500 mt-1">{errors.startYear.message}</p>}
          </div>
          <div className="flex-1">
            <label className="text-sm text-gray-300 mb-1 block">End Year *</label>
            <Select onValueChange={handleEndYearChange}>
              <SelectTrigger><SelectValue placeholder="Select year" /></SelectTrigger>
              <SelectContent>
                {YEARS.map((y) => <SelectItem key={y} value={String(y)}>{y}</SelectItem>)}
              </SelectContent>
            </Select>
            {(errors.endYear || yearError) && (
              <p className="text-sm text-red-500 mt-1">
                {yearError || errors.endYear?.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between p-3 rounded border">
          <span className="text-sm text-gray-300">I&apos;m over 16</span>
          <Switch
            checked={watch('over16')}
            onCheckedChange={(val) => setValue('over16', val)}
          />
        </div>


        <Button variant="link" className="w-full" type="button" onClick={onNotStudent}>
          I&apos;m not a student
        </Button>
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting || !isFormValid}>
        Continue
      </Button>
    </form>
  );
}
