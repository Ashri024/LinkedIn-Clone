import { z } from 'zod';

export const ExperienceSchema = z.object({
    title: z.string().min(1, "Job title is required"),
    companyId: z.string().min(1, "Company is required"),
    employmentType: z.enum(['full time','part time','self employed','freelance','internship','trainee']),
    locationType: z.enum(['on-site','remote','hybrid']).optional(),
    positions: z
      .array(
        z.object({
          title: z.string().min(1),
          start: z.object({ month: z.number().min(1).max(12), year: z.number().min(1900) }),
          end: z.object({ month: z.number().min(1).max(12), year: z.number().min(1900) }),
          location: z.string().optional(),
          description: z.string().optional(),
          skills: z.array(z.string()).optional(),
        })
      )
      .min(1),
  });
  
  export type ExperienceForm = z.infer<typeof ExperienceSchema>;