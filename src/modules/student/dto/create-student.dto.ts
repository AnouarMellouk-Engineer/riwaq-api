import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';
import { StudentGender } from 'src/database/enums';

export const CreateStudentSchema = z.object({
  first_name: z.string().min(1),
  last_name: z.string().min(1),
  date_of_birth: z.iso.date(),
  address: z.string().min(1),
  avatar_url: z.string().url().optional(),
  gender: z.nativeEnum(StudentGender),
  classId: z.string().uuid().optional(),
});

export class CreateStudentDto extends createZodDto(CreateStudentSchema) {}
