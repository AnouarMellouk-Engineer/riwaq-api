import { z } from 'zod';
import { UserStatus } from 'src/database/enums';
import { createZodDto } from 'nestjs-zod';

// Invitation is created by the system on admin creation (status: INVITED),
// never set manually here — school owners can only toggle active/suspended.
export const changeStatusSchema = z.object({
  status: z.enum([UserStatus.ACTIVE, UserStatus.SUSPENDED]),
});

// export type ChangeStatusDto = z.infer<typeof changeStatusSchema>;
export class ChangeStatusDto extends createZodDto(changeStatusSchema) {}
