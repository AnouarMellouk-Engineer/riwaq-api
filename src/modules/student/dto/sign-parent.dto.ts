import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const SignParentSchema = z.object({
  parentId: z.string().uuid(),
});

export class SignParentDto extends createZodDto(SignParentSchema) {}
