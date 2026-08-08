import { z } from 'zod';

const createStudentSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(2, 'first name must be at least 2 characters long')
    .max(255, 'first name must be at most 255 characters long'),
  lastName: z
    .string()
    .trim()
    .min(2, 'last name must be at least 2 characters long')
    .max(255, 'last name must be at most 255 characters long'),
  dateOfBirth: z.coerce.date('dateOfBirth must be a valid date'),
  parentId: z.uuid('parentId must be a valid uuid'),
  classId: z.uuid('classId must be a valid uuid').optional(),
});

export type CreateStudentDto = z.infer<typeof createStudentSchema>;

export default createStudentSchema;
