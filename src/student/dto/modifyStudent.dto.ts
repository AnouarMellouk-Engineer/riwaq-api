import { z } from 'zod';

const modifyStudentSchema = z.object({
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
  dateOfBirth: z.coerce.date('dateOfBirth must be a valid date').optional(),
  parentId: z.uuid('parentId must be a valid uuid').optional(),
  classId: z.uuid('classId must be a valid uuid').optional(),
});

export type ModifyStudentDto = z.infer<typeof modifyStudentSchema>;

export default modifyStudentSchema;
