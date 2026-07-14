import * as z from 'zod';

const createNewTenantSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.email(),
  address: z.string().min(1),
  password: z.string().min(8),
  schoolName: z.string().min(1),
});

export type CreatenewTenantDto = z.infer<typeof createNewTenantSchema>;
