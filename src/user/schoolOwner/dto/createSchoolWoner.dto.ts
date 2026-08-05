import { z } from 'zod';

const createSchoolWonerSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(2, 'first name must be at least 2 characters long')
    .max(255, 'first name must be at most 255 characters long'),
  lastName: z
    .string()
    .trim()
    .min(2, 'last name must be at least 2 characters long')
    .max(255, 'last name must be at most 255 characters long'),
  email: z.email('email must be a valid email address'),
  password: z
    .string()
    .min(8, 'password must be at least 8 characters long')
    .max(255, 'password must be at most 255 characters long'),
  avatarUrl: z.url('avatarUrl must be a valid url').optional(),
});

export type CareateSchoolWonerDto = z.infer<typeof createSchoolWonerSchema>;

export default createSchoolWonerSchema;
