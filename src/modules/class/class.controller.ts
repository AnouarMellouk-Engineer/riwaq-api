import {
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Body,
  Param,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { ClassService } from './class.service';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from 'src/database/enums';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import {
  CurrentUser,
  type AuthenticatedUser,
} from '../user/decorators/current-user.decorator';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { AddStudentDto } from './dto/add-student.dto';
import { AddTeacherDto } from './dto/add-teacher.dto';
import { ZodValidationPipe } from 'nestjs-zod';

@Controller('classes')
@Roles([Role.SCHOOL_OWNER, Role.ADMIN])
@UseGuards(JwtAuthGuard, RolesGuard)
export class ClassController {
  public constructor(private readonly classService: ClassService) {}

  @Get()
  findAll(@CurrentUser() user: AuthenticatedUser) {
    return this.classService.findAll(user.schoolSlug);
  }

  @Get(':classId')
  findOne(
    @Param('classId', ParseUUIDPipe) classId: string,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.classService.findOne(classId, user.schoolSlug);
  }

  @Post()
  create(
    @Body(ZodValidationPipe) dto: CreateClassDto,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.classService.create(dto, user.schoolSlug);
  }

  @Put(':classId')
  update(
    @Param('classId', ParseUUIDPipe) classId: string,
    @Body(ZodValidationPipe) dto: UpdateClassDto,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.classService.update(classId, dto, user.schoolSlug);
  }

  @Delete(':classId')
  delete(
    @Param('classId', ParseUUIDPipe) classId: string,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.classService.delete(classId, user.schoolSlug);
  }

  @Post(':classId/students')
  addStudent(
    @Param('classId', ParseUUIDPipe) classId: string,
    @Body(ZodValidationPipe) dto: AddStudentDto,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.classService.addStudent(classId, dto, user.schoolSlug);
  }

  @Delete(':classId/students/:studentId')
  deleteStudent(
    @Param('classId', ParseUUIDPipe) classId: string,
    @Param('studentId', ParseUUIDPipe) studentId: string,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.classService.deleteStudent(classId, studentId, user.schoolSlug);
  }

  @Post(':classId/teachers')
  addTeacher(
    @Param('classId', ParseUUIDPipe) classId: string,
    @Body(ZodValidationPipe) dto: AddTeacherDto,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.classService.addTeacher(classId, dto, user.schoolSlug);
  }

  @Delete(':classId/teachers/:teacherId')
  deleteTeacher(
    @Param('classId', ParseUUIDPipe) classId: string,
    @Param('teacherId', ParseUUIDPipe) teacherId: string,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.classService.deleteTeacher(classId, teacherId, user.schoolSlug);
  }
}
