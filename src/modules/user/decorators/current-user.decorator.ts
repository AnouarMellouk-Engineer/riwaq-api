import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Role } from 'src/database/enums';

export interface AuthenticatedUser {
  id: string;
  username: string;
  email: string;
  role: Role;
  schoolSlug: string;
}

export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): AuthenticatedUser => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
