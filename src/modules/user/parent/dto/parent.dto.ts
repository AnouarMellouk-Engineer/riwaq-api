import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

export const createParentSchema = z.object({
  first_name: z.string().min(2).max(50),
  last_name: z.string().min(2).max(50),
  email: z.string().email(),
  phone_number: z.string().min(8).max(20),
  address: z.string().min(3).max(255),
});

export class CreateParentDto extends createZodDto(createParentSchema) {}

export const updateParentSchema = createParentSchema.partial();

export class UpdateParentDto extends createZodDto(updateParentSchema) {}

export const assignChildrenSchema = z.object({
  student_ids: z.array(z.string().uuid()).min(1),
});

export class AssignChildrenDto extends createZodDto(assignChildrenSchema) {}
