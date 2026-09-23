// src/school/dto/school.schema.ts
import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const CreateSchoolSchema = z.object({
  name: z.string().min(1, 'School name is required').max(150),
  slug: z
    .string()
    .min(3, 'Slug must be at least 3 characters')
    .max(80)
    .regex(
      /^[a-z0-9-]+$/,
      'Slug must be lowercase letters, numbers, and hyphens only',
    ),
});

// export type CreateSchoolDto = z.infer<typeof CreateSchoolSchema>;
export class CreateSchoolDto extends createZodDto(CreateSchoolSchema) {}
