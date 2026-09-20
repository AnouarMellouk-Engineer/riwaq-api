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
import { ZodValidationPipe } from 'src/common/pipes/zodValidation.pipe';
import { AdminService } from './admin.service';
import { CurrentUser } from '../decorators/current-user.decorator';
import type { AuthenticatedUser } from '../decorators/current-user.decorator';
import type { CreateAdminDto } from './dto/create-admin.dto';
import type { UpdateAdminDto } from './dto/update-admin.dto';
import type { ChangeStatusDto } from './dto/change-status.dto';
import { createAdminSchema } from './dto/create-admin.dto';
import { updateAdminSchema } from './dto/update-admin.dto';
import { changeStatusSchema } from './dto/change-status.dto';

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
    @Body(new ZodValidationPipe(createAdminSchema)) dto: CreateAdminDto,
  ) {
    return this.adminService.create(user.schoolSlug, dto);
  }

  @Put(':adminId')
  modify(
    @CurrentUser() user: AuthenticatedUser,
    @Param('adminId', ParseUUIDPipe) adminId: string,
    @Body(new ZodValidationPipe(updateAdminSchema)) dto: UpdateAdminDto,
  ) {
    return this.adminService.modify(user.schoolSlug, adminId, dto);
  }

  // PATCH on a dedicated sub-path instead.
  @Patch(':adminId/status')
  changeStatus(
    @CurrentUser() user: AuthenticatedUser,
    @Param('adminId', ParseUUIDPipe) adminId: string,
    @Body(new ZodValidationPipe(changeStatusSchema)) dto: ChangeStatusDto,
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
