import * as z from 'zod';

const updatePlatformOwnerSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(2, 'first name must be at least 2 characters long')
    .max(255, 'first name must be at most 255 characters long')
    .optional(),
  lastName: z
    .string()
    .trim()
    .min(2, 'last name must be at least 2 characters long')
    .max(255, 'last name must be at most 255 characters long')
    .optional(),
  avatarUrl: z.url('avatarUrl must be a valid url').optional(),
});

export type UpdatePlatformOwnerDto = z.infer<typeof updatePlatformOwnerSchema>;

export default updatePlatformOwnerSchema;
