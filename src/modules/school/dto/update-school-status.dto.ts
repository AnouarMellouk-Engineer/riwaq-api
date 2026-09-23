// src/school/dto/update-school-status.schema.ts
import { z } from 'zod';
import { Status } from 'src/database/enums';
import { createZodDto } from 'nestjs-zod';

export const UpdateSchoolStatusSchema = z.object({
  status: z.enum(Status, {
    error: 'Status must be either "active" or "suspended"',
  }),
});

// export type UpdateSchoolStatusDto = z.infer<typeof UpdateSchoolStatusSchema>;
export class UpdateSchoolStatusDto extends createZodDto(
  UpdateSchoolStatusSchema,
) {}
