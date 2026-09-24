import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Role } from 'src/database/enums';
import { Roles } from 'src/modules/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/modules/auth/guards/roles.guard';
import {
  CurrentUser,
  type AuthenticatedUser,
} from '../decorators/current-user.decorator';
import { ParentService } from './parent.service';
import {
  AssignChildrenDto,
  CreateParentDto,
  UpdateParentDto,
} from './dto/parent.dto';
import { ZodValidationPipe } from 'nestjs-zod';

@Controller('users/parents')
@Roles([Role.SCHOOL_OWNER, Role.ADMIN])
@UseGuards(JwtAuthGuard, RolesGuard)
export class ParentController {
  constructor(private readonly parentService: ParentService) {}

  @Post()
  create(
    @CurrentUser() user: AuthenticatedUser,
    @Body(ZodValidationPipe) dto: CreateParentDto,
  ) {
    return this.parentService.create(user.schoolSlug, dto);
  }

  @Get()
  findAll(@CurrentUser() user: AuthenticatedUser) {
    return this.parentService.findAll(user.schoolSlug);
  }

  @Get(':parentId')
  findOne(
    @CurrentUser() user: AuthenticatedUser,
    @Param('parentId', ParseUUIDPipe) id: string,
  ) {
    return this.parentService.findOne(user.schoolSlug, id);
  }

  @Patch('parentId')
  update(
    @CurrentUser() user: AuthenticatedUser,
    @Param('parentId', ParseUUIDPipe) id: string,
    @Body(ZodValidationPipe) dto: UpdateParentDto,
  ) {
    return this.parentService.update(user.schoolSlug, id, dto);
  }

  @Delete(':parentId')
  remove(
    @CurrentUser() user: AuthenticatedUser,
    @Param('parentId', ParseUUIDPipe) id: string,
  ) {
    return this.parentService.remove(user.schoolSlug, id);
  }

  @Post(':parentId/children')
  assignChildren(
    @CurrentUser() user: AuthenticatedUser,
    @Param('parentId', ParseUUIDPipe) id: string,
    @Body(ZodValidationPipe) dto: AssignChildrenDto,
  ) {
    return this.parentService.assignChildren(user.schoolSlug, id, dto);
  }

  @Delete(':parentId/children/:studentId')
  removeChild(
    @CurrentUser() user: AuthenticatedUser,
    @Param('parentId', ParseUUIDPipe) id: string,
    @Param('studentId', ParseUUIDPipe) studentId: string,
  ) {
    return this.parentService.removeChild(user.schoolSlug, id, studentId);
  }
}
