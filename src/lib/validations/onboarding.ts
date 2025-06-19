import { z } from 'zod';

export const OnboardingSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email'),
  phone: z.string().regex(/^\d{10}$/, 'Phone must be 10 digits'),
  country: z.string().min(1, 'Country is required'),
});

export type OnboardingFormData = z.infer<typeof OnboardingSchema>;
