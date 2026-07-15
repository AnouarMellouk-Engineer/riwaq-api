import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

import type { CreateNewTenantDto } from './dtos/createNewTenant.dto';
import { createNewTenantSchema } from './dtos/createNewTenant.dto';
import { ZodValidationPipe } from 'src/ValidationPipe';

@Controller('auth')
export class AuthController {
  constructor(private authservice: AuthService) {}

  @Post('register')
  async register(
    @Body(new ZodValidationPipe(createNewTenantSchema))
    createDto: CreateNewTenantDto,
  ) {
    return await this.authservice.createNewTenant(createDto);
  }

  @Get('login')
  login() {}

  @Get('logout')
  logout() {}
}
