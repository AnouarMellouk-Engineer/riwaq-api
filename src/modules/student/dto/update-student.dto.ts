import { createZodDto } from 'nestjs-zod';
import { CreateStudentSchema } from './create-student.dto';

export const UpdateStudentSchema = CreateStudentSchema.partial();

export class UpdateStudentDto extends createZodDto(UpdateStudentSchema) {}
