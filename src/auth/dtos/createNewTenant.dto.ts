import * as z from 'zod';

export const createNewTenantSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.email(),
  address: z.string().min(1),
  password: z.string().min(8),
  schoolName: z.string().min(1),
});

export type CreateNewTenantDto = z.infer<typeof createNewTenantSchema>;
