import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { SchoolOwnerService } from '../user/school-owner/school-owner.service';
import { ZodValidationPipe } from 'nestjs-zod';

import { CreateSchoolOwnerDto } from '../user/school-owner/dto/school-owner.dto';

import { LocalAuthGuard } from './guards/loca-auth.guard';
import { AuthService } from './auth.service';
import { RefreshJwtAuthGuard } from './guards/refresh-token-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  public constructor(
    private readonly schoolOwnerService: SchoolOwnerService,
    private readonly authservice: AuthService,
  ) {}

  @Post('register')
  register(
    @Body(ZodValidationPipe)
    dto: CreateSchoolOwnerDto,
  ) {
    return this.schoolOwnerService.create(dto);
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  login(@Req() req) {
    return this.authservice.login(req.user);
  }

  @Post('refresh')
  @UseGuards(RefreshJwtAuthGuard)
  refresh(@Req() req) {
    const payload = {
      sub: {
        id: req.user.id,
        email: req.user.email,
        role: req.user.role,
        schoolSlug: req.user.schoolSlug,
      },
      username: req.user.username,
    };
    return this.authservice.refresh(payload, req.user.refreshToken);
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  logout(@Req() req) {
    return this.authservice.logout(req.user.id);
  }
}
