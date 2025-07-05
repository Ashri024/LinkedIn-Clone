'use client';

import { IProfile } from '@/models/Profile';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useDialogStore } from '@/store/dialogStore';
import ContactInfo from './ContactInfo';

const EditContactSchema = z.object({
  phone:z.string().regex(/^\d{10}$/, 'Phone must be 10 digits').optional(),
  address: z.string().max(220, 'Max 220 characters').optional(),
  birthdayMonth: z.string().optional(),
  birthdayDay: z.string().optional(),
});

type EditContactType = z.infer<typeof EditContactSchema>;

export default function EditContactInfo({ profile, setProfile, isOwner }: { profile: IProfile, setProfile: (profile: IProfile) => void; isOwner: boolean }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<EditContactType>({
    resolver: zodResolver(EditContactSchema),
    defaultValues: {
      phone: profile.phone || '',
      address: profile.address || '',
      birthdayMonth: profile.birthday?.month || '',
      birthdayDay: profile.birthday?.day?.toString() || '',
    },
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: EditContactType) => {
    // console.log("IsOwner:   ", isOwner);
    if (!isOwner) {
      toast.error('You are not authorized to edit this profile');
      return;
    }
    let selectedMonth=undefined;
    if (data.birthdayMonth) {
      selectedMonth = data.birthdayMonth.toLowerCase();
      if (selectedMonth === 'select month') {
        selectedMonth = undefined;
      }
    }
    let selectedDay=undefined;
    if (data.birthdayDay) {
      selectedDay = parseInt(data.birthdayDay);
      if (selectedDay < 1 || selectedDay > 31) {
        selectedDay = undefined;
      }
    }
    const payload = {
      phone: data.phone || undefined,
      address: data.address || undefined,
      birthday: {
        month: selectedMonth,
        day: selectedDay,
      },
    };
    // console.log("Submitting contact info:", payload);
    setLoading(true);
    try {
      const res = await fetch('/api/profile', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.message || 'Something went wrong');
      }
      setProfile(result.profile); 
      toast.success('Contact info updated successfully');
      // console.log('✅ Updated Profile:', result.profile);
      useDialogStore.getState().openDialog(
        <ContactInfo isOwner={isOwner} profile={result.profile} setProfile={setProfile} />
      ); // Open dialog with updated profile info
    } catch (err) { 
      const ErrMessage = err instanceof Error ? err.message : 'An error occurred';
      console.error('❌ Update failed:', ErrMessage);
      toast.error(ErrMessage || 'Failed to update contact info');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pb-4">
      <h2 className="text-lg font-semibold border-b pb-4">Edit contact info</h2>

      <div className="space-y-4">
        {/* Profile URL */}
        <div>
          <label className="text-sm font-medium">Profile URL</label>
          <div className="flex items-center gap-2 text-sm linkedIn-link">
            <Link
              href={`${process.env.NEXT_PUBLIC_BASE_URL}/profile/${profile.firstName.toLowerCase()}-${profile.lastName.toLowerCase()}-${profile._id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="break-all"
            >
              {`${process.env.NEXT_PUBLIC_BASE_URL}/profile/${profile.firstName.toLowerCase()}-${profile.lastName.toLowerCase()}-${profile._id}`}
            </Link>
            <ExternalLink className="h-4 w-4" />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="text-sm font-medium">Email</label>
          <div className="flex items-center gap-2 text-sm linkedIn-link">
            <Link href={`mailto:${profile.email}`} className="">
              {profile.email}
            </Link>
            <ExternalLink className="h-4 w-4" />
          </div>
        </div>

        {/* Phone Number */}
        <div className='flex flex-col gap-1'>
          <label className="text-sm font-medium">Phone number</label>
          <Input
            type="tel"
            {...register('phone')}
            placeholder="Enter phone number"
            className="focus-visible:border-none bg-transparent dark:bg-transparent rounded-xs"
          />
          {errors.phone && <p className="text-xs text-red-500">{errors.phone.message}</p>}
        </div>

        {/* Address */}
        <div className='flex flex-col gap-1'>
          <label className="text-sm font-medium">Address</label>
          <Textarea
            rows={3}
            {...register('address')}
            placeholder="Enter address (optional)"
            className="focus-visible:border-none bg-transparent dark:bg-transparent rounded-xs"
          />
          {errors.address && <p className="text-xs text-red-500">{errors.address.message}</p>}
        </div>

        {/* Birthday */}
        <div>
          <label className="text-sm font-medium mb-1 block">Birthday</label>
          <div className="flex gap-4">
            <Select onValueChange={(val) => setValue('birthdayMonth', val)}
              defaultValue={profile.birthday?.month || 'Select month'}
              >
              <SelectTrigger className="w-1/2 dark:bg-transparent rounded-xs">
                <SelectValue placeholder="Month" />
              </SelectTrigger>
              <SelectContent>
                {[
                  'january', 'february', 'march', 'april', 'may', 'june',
                  'july', 'august', 'september', 'october', 'november', 'december', 'Select month'
                ].map((month) => (
                  <SelectItem key={month} value={month}>
                    {month}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select defaultValue={
profile.birthday?.day?.toString() || 'Select day'
            } onValueChange={(val) => setValue('birthdayDay', val)}>
              <SelectTrigger className="w-1/2 dark:bg-transparent rounded-xs">
                <SelectValue placeholder="Day" />
              </SelectTrigger>
              <SelectContent>
                {[...Array(31)].map((_, i) => (
                  <SelectItem key={i + 1} value={(i + 1).toString()}>
                    {i + 1}
                  </SelectItem>
                ))}
                <SelectItem value="Select day">
                  Select day
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <Button
        type="submit"
        disabled={loading}
        className="w-fit ml-auto block linkedIn-button-filled rounded-full"
      >
        {loading ? 'Saving...' : 'Save'}
      </Button>
    </form>
  );
}
