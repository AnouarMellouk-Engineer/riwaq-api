import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';
import { ModuleName } from 'src/database/enums';

export const AddTeacherSchema = z.object({
  teacherId: z.string().uuid(),
  module: z.nativeEnum(ModuleName),
});

export class AddTeacherDto extends createZodDto(AddTeacherSchema) {}
