import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Role } from 'src/database/enums';

export interface AuthenticatedUser {
  id: string;
  username: string;
  email: string;
  role: Role;
  schoolSlug: string;
}
// you can use this decorator in every protected endpoint to extract data from the user (multi tenant)
export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): AuthenticatedUser => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
