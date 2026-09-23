import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const createAdminSchema = z.object({
  first_name: z.string().min(2).max(50),
  last_name: z.string().min(2).max(50),
  email: z.string().email(),
  username: z.string().min(3).max(30),
  address: z.string().min(2).max(255),
  phone_number: z.string().min(6).max(20),
});

// export type CreateAdminDto = z.infer<typeof createAdminSchema>;
export class CreateAdminDto extends createZodDto(createAdminSchema) {}
