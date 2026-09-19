import { z } from 'zod';
import { createAdminSchema } from './create-admin.dto';

// email/username excluded on purpose: changing identifiers is a separate,
// more sensitive flow than a plain profile edit.
export const updateAdminSchema = createAdminSchema
  .omit({ email: true, username: true })
  .partial();

export type UpdateAdminDto = z.infer<typeof updateAdminSchema>;
