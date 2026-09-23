import { z } from 'zod';
import { ModuleName } from 'src/database/enums';
import { createZodDto } from 'nestjs-zod';

export const createTeacherSchema = z.object({
  first_name: z.string().min(2).max(50),
  last_name: z.string().min(2).max(50),
  email: z.string().email(),
  username: z.string().min(3).max(30),
  address: z.string().min(2).max(255),
  phone_number: z.string().min(6).max(20),
  modules: z.array(z.nativeEnum(ModuleName)).optional(),
});

// export type CreateTeacherDto = z.infer<typeof createTeacherSchema>;

export class CreateTeacherDto extends createZodDto(createTeacherSchema) {}
