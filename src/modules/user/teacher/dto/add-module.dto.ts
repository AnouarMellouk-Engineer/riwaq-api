import { z } from 'zod';
import { ModuleName } from 'src/database/enums';
import { createZodDto } from 'nestjs-zod';

export const addModuleSchema = z.object({
  module: z.nativeEnum(ModuleName),
});

export class AddModuleDto extends createZodDto(addModuleSchema) {}
