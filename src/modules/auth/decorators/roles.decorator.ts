import { Reflector } from '@nestjs/core';
import { Role } from 'src/database/enums';

export const Roles = Reflector.createDecorator<Role[]>();
