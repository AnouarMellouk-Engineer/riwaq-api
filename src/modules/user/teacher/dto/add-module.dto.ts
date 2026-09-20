import { z } from 'zod';
import { ModuleName } from 'src/database/enums';

export const addModuleSchema = z.object({
  module: z.nativeEnum(ModuleName),
});

export type AddModuleDto = z.infer<typeof addModuleSchema>;
