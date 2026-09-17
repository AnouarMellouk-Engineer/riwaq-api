import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './modules/auth/guards/jwt-auth.guard';
import { Roles } from './modules/auth/decorators/roles.decorator';
import { Role } from './database/enums';
import { RolesGuard } from './modules/auth/guards/roles.guard';

@Controller()
export class AppController {
  @Get('/public')
  sayHello() {
    return 'hello';
  }

  @Get('/userlogged')
  @UseGuards(JwtAuthGuard)
  user() {
    return 'the user logged in ';
  }

  @Get('/schoolOwner')
  @Roles([Role.SCHOOL_OWNER])
  @UseGuards(JwtAuthGuard, RolesGuard)
  schoolowner() {
    return 'the school Owner logged in ';
  }

  @Get('/admins')
  @Roles([Role.ADMIN])
  @UseGuards(JwtAuthGuard, RolesGuard)
  admin() {
    return 'the admin  logged in ';
  }

  @Get('/adminsOrSchoolOwner')
  @Roles([Role.ADMIN, Role.SCHOOL_OWNER])
  @UseGuards(JwtAuthGuard, RolesGuard)
  adminorschool() {
    return 'the admin or school owner logged in ';
  }
}
