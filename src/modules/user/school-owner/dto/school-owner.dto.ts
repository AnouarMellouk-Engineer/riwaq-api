// src/school-owner/dto/school-owner.schema.ts
import { z } from 'zod';
import { CreateSchoolSchema } from 'src/modules/school/dto/school.dto';

export const CreateSchoolOwnerSchema = z.object({
  first_name: z.string().min(1, 'First name is required').max(100),
  last_name: z.string().min(1, 'Last name is required').max(100),
  email: z.string().email('Invalid email address'),
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters')
    .max(50)
    .regex(/^[a-zA-Z0-9_.-]+$/, 'Username contains invalid characters'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  address: z.string().min(1, 'Address is required'),
  phone_number: z
    .string()
    .min(8, 'Phone number is too short')
    .max(20, 'Phone number is too long'),
  avatar_url: z.string().url('Invalid avatar URL').optional(),
  school: CreateSchoolSchema,
});

export type CreateSchoolOwnerDto = z.infer<typeof CreateSchoolOwnerSchema>;
