import { Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authservice: AuthService) {}

  @Post('resigter')
  register() {}

  @Get('login')
  login() {}

  @Get('logout')
  logout() {}
}
