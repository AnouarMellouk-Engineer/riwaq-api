import { z } from 'zod';
import { createTeacherSchema } from './create-teacher.dto';

export const updateTeacherSchema = createTeacherSchema
  .omit({ email: true, username: true, modules: true })
  .partial();

export type UpdateTeacherDto = z.infer<typeof updateTeacherSchema>;
