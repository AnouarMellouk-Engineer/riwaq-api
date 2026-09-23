import { z } from 'zod';
import { ModuleName } from 'src/database/enums';
import { createZodDto } from 'nestjs-zod';

export const addModuleSchema = z.object({
  module: z.nativeEnum(ModuleName),
});

// export type AddModuleDto = z.infer<typeof addModuleSchema>;

export class AddModuleDto extends createZodDto(addModuleSchema) {}
