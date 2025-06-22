import { z } from 'zod';

export const EducationSchema = z.object({
  school: z.string().min(1, "School/University is required"),
  degree: z.string().optional(),
  fieldOfStudy: z.string().optional(),
  period: z.object({
    start: z.object({ month: z.number().min(1).max(12), year: z.number().min(1900) }),
    end: z.object({ month: z.number().min(1).max(12), year: z.number().min(1900) }),
  }),
});

export type EducationForm = z.infer<typeof EducationSchema>;