import { createZodDto } from 'nestjs-zod';
import { CreateClassSchema } from './create-class.dto';

export const UpdateClassSchema = CreateClassSchema.partial();

export class UpdateClassDto extends createZodDto(UpdateClassSchema) {}
