import * as z from 'zod';

const planSchema = z.object({
  name: z
    .string()
    .min(2, 'name must be at least 2 characters long')
    .max(255, 'name must be at most 255 characters long'),
  price: z.float32(),
});

export type CreatePlanDto = z.infer<typeof planSchema>;

export default planSchema;
