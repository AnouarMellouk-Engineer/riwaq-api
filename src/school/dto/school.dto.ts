import * as z from 'zod';
import { SchoolStatus } from 'src/entities/school.entity';

const schoolSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'name must be at least 2 characters long')
    .max(255, 'name must be at most 255 characters long'),
  slug: z
    .string()
    .trim()
    .toLowerCase()
    .min(2, 'slug must be at least 2 characters long')
    .max(255, 'slug must be at most 255 characters long')
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      'slug must contain only lowercase letters, numbers and hyphens, and cannot start or end with a hyphen',
    ),
  status: z.enum(SchoolStatus).default(SchoolStatus.ACTIVE),
  planId: z.uuid('planId must be a valid uuid'),
});

export type CreateSchoolDto = z.infer<typeof schoolSchema>;

export default schoolSchema;
