import { createTeacherSchema } from './create-teacher.dto';
import { createZodDto } from 'nestjs-zod';

export const updateTeacherSchema = createTeacherSchema
  .omit({ email: true, username: true, modules: true })
  .partial();

export class UpdateTeacherDto extends createZodDto(updateTeacherSchema) {}
