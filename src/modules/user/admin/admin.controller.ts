import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { Role } from 'src/database/enums';
import { Roles } from 'src/modules/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/modules/auth/guards/roles.guard';
import { ZodValidationPipe } from 'nestjs-zod';
import { AdminService } from './admin.service';
import { CurrentUser } from '../decorators/current-user.decorator';
import type { AuthenticatedUser } from '../decorators/current-user.decorator';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { ChangeStatusDto } from './dto/change-status.dto';

@Controller('users/admins')
@Roles([Role.SCHOOL_OWNER])
@UseGuards(JwtAuthGuard, RolesGuard)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get()
  findAll(@CurrentUser() user: AuthenticatedUser) {
    return this.adminService.findAll(user.schoolSlug);
  }

  @Get(':adminId')
  findById(
    @CurrentUser() user: AuthenticatedUser,
    @Param('adminId', ParseUUIDPipe) adminId: string,
  ) {
    return this.adminService.findById(user.schoolSlug, adminId);
  }

  @Post()
  create(
    @CurrentUser() user: AuthenticatedUser,
    @Body(ZodValidationPipe) dto: CreateAdminDto,
  ) {
    return this.adminService.create(user.schoolSlug, dto);
  }

  @Put(':adminId')
  modify(
    @CurrentUser() user: AuthenticatedUser,
    @Param('adminId', ParseUUIDPipe) adminId: string,
    @Body(ZodValidationPipe) dto: UpdateAdminDto,
  ) {
    return this.adminService.modify(user.schoolSlug, adminId, dto);
  }

  // PATCH on a dedicated sub-path instead.
  @Patch(':adminId/status')
  changeStatus(
    @CurrentUser() user: AuthenticatedUser,
    @Param('adminId', ParseUUIDPipe) adminId: string,
    @Body(ZodValidationPipe) dto: ChangeStatusDto,
  ) {
    return this.adminService.changeStatus(user.schoolSlug, adminId, dto);
  }

  @Delete(':adminId')
  delete(
    @CurrentUser() user: AuthenticatedUser,
    @Param('adminId', ParseUUIDPipe) adminId: string,
  ) {
    return this.adminService.delete(user.schoolSlug, adminId);
  }
}
