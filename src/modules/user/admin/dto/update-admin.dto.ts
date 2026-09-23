import { z } from 'zod';
import { createAdminSchema } from './create-admin.dto';
import { createZodDto } from 'nestjs-zod';

// email/username excluded on purpose: changing identifiers is a separate,
// more sensitive flow than a plain profile edit.
export const updateAdminSchema = createAdminSchema
  .omit({ email: true, username: true })
  .partial();

export class UpdateAdminDto extends createZodDto(updateAdminSchema) {}
