import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseEnumPipe,
  ParseUUIDPipe,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ModuleName, Role } from 'src/database/enums';
import { Roles } from 'src/modules/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/modules/auth/guards/roles.guard';
import { ZodValidationPipe } from 'src/common/pipes/zodValidation.pipe';
import { TeacherService } from './teacher.service';
import { CurrentUser } from '../decorators/current-user.decorator';
import type { AuthenticatedUser } from '../decorators/current-user.decorator';
import { createTeacherSchema } from './dto/create-teacher.dto';
import type { CreateTeacherDto } from './dto/create-teacher.dto';
import { updateTeacherSchema } from './dto/update-teacher.dto';
import type { UpdateTeacherDto } from './dto/update-teacher.dto';
import { changeStatusSchema } from '../admin/dto/change-status.dto';
import type { ChangeStatusDto } from '../admin/dto/change-status.dto';
import { addModuleSchema } from './dto/add-module.dto';
import type { AddModuleDto } from './dto/add-module.dto';

@Controller('users/teachers')
@Roles([Role.ADMIN, Role.SCHOOL_OWNER])
@UseGuards(JwtAuthGuard, RolesGuard)
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}

  @Get()
  findAll(@CurrentUser() user: AuthenticatedUser) {
    return this.teacherService.findAll(user.schoolSlug);
  }

  @Get(':teacherId')
  findBy(
    @CurrentUser() user: AuthenticatedUser,
    @Param('teacherId', ParseUUIDPipe) teacherId: string,
  ) {
    return this.teacherService.findById(user.schoolSlug, teacherId);
  }

  @Post()
  add(
    @CurrentUser() user: AuthenticatedUser,
    @Body(new ZodValidationPipe(createTeacherSchema)) dto: CreateTeacherDto,
  ) {
    return this.teacherService.create(user.schoolSlug, dto);
  }

  @Put(':teacherId')
  modify(
    @CurrentUser() user: AuthenticatedUser,
    @Param('teacherId', ParseUUIDPipe) teacherId: string,
    @Body(new ZodValidationPipe(updateTeacherSchema)) dto: UpdateTeacherDto,
  ) {
    return this.teacherService.modify(user.schoolSlug, teacherId, dto);
  }

  @Patch(':teacherId/status')
  changeStatus(
    @CurrentUser() user: AuthenticatedUser,
    @Param('teacherId', ParseUUIDPipe) teacherId: string,
    @Body(new ZodValidationPipe(changeStatusSchema)) dto: ChangeStatusDto,
  ) {
    return this.teacherService.changeStatus(user.schoolSlug, teacherId, dto);
  }

  @Delete(':teacherId')
  delete(
    @CurrentUser() user: AuthenticatedUser,
    @Param('teacherId', ParseUUIDPipe) teacherId: string,
  ) {
    return this.teacherService.delete(user.schoolSlug, teacherId);
  }

  @Post(':teacherId/modules')
  addModule(
    @CurrentUser() user: AuthenticatedUser,
    @Param('teacherId', ParseUUIDPipe) teacherId: string,
    @Body(new ZodValidationPipe(addModuleSchema)) dto: AddModuleDto,
  ) {
    return this.teacherService.addModule(user.schoolSlug, teacherId, dto);
  }

  @Delete(':teacherId/modules/:moduleId')
  deleteModule(
    @CurrentUser() user: AuthenticatedUser,
    @Param('teacherId', ParseUUIDPipe) teacherId: string,
    @Param('moduleId', new ParseEnumPipe(ModuleName)) moduleId: ModuleName,
  ) {
    return this.teacherService.deleteModule(
      user.schoolSlug,
      teacherId,
      moduleId,
    );
  }
}
