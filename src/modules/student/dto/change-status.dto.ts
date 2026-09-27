import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';
import { Status } from 'src/database/enums';

export const ChangeStatusSchema = z.object({
  status: z.nativeEnum(Status),
});

export class ChangeStatusDto extends createZodDto(ChangeStatusSchema) {}
