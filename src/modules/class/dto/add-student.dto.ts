import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const AddStudentSchema = z.object({
  studentId: z.string().uuid(),
});

export class AddStudentDto extends createZodDto(AddStudentSchema) {}
