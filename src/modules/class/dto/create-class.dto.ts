import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';
import { Grade } from 'src/database/enums';

export const CreateClassSchema = z.object({
  grade: z.nativeEnum(Grade),
  level: z.number().int().positive(),
  number: z.number().int().positive(),
});

export class CreateClassDto extends createZodDto(CreateClassSchema) {}
