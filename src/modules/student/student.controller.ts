import {
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Patch,
  Body,
  Param,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from 'src/database/enums';
import {
  CurrentUser,
  type AuthenticatedUser,
} from '../user/decorators/current-user.decorator';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { ChangeStatusDto } from './dto/change-status.dto';
import { SignParentDto } from './dto/sign-parent.dto';
import { ZodValidationPipe } from 'nestjs-zod';

@Controller('students')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles([Role.SCHOOL_OWNER, Role.ADMIN])
export class StudentController {
  public constructor(private readonly studentService: StudentService) {}

  @Get()
  findAll(@CurrentUser() user: AuthenticatedUser) {
    return this.studentService.findAll(user.schoolSlug);
  }

  @Get(':studentId')
  findOne(
    @Param('studentId', ParseUUIDPipe) studentId: string,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.studentService.findOne(studentId, user.schoolSlug);
  }

  @Post()
  create(
    @Body(ZodValidationPipe) dto: CreateStudentDto,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.studentService.create(dto, user.schoolSlug);
  }

  @Put(':studentId')
  update(
    @Param('studentId', ParseUUIDPipe) studentId: string,
    @Body(ZodValidationPipe) dto: UpdateStudentDto,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.studentService.update(studentId, dto, user.schoolSlug);
  }

  @Patch(':studentId/status')
  changeStatus(
    @Param('studentId', ParseUUIDPipe) studentId: string,
    @Body(ZodValidationPipe) dto: ChangeStatusDto,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.studentService.changeStatus(studentId, dto, user.schoolSlug);
  }

  @Post(':studentId/parents')
  signToParent(
    @Param('studentId', ParseUUIDPipe) studentId: string,
    @Body(ZodValidationPipe) dto: SignParentDto,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.studentService.signToParent(studentId, dto, user.schoolSlug);
  }

  @Delete(':studentId/parents')
  removeParent(
    @Param('studentId', ParseUUIDPipe) studentId: string,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.studentService.removeParent(studentId, user.schoolSlug);
  }
}
