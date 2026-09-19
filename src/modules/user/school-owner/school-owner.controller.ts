import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { SchoolOwnerService } from './school-owner.service';
import {
  CreateSchoolOwnerSchema,
  type CreateSchoolOwnerDto,
} from './dto/school-owner.dto';
import { ZodValidationPipe } from 'src/common/pipes/zodValidation.pipe';
import { Role } from 'src/database/enums';
import { Roles } from 'src/modules/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/modules/auth/guards/roles.guard';

@Controller('users/school-owners')
export class SchoolOwnerController {
  public constructor(private readonly schoolOwnerService: SchoolOwnerService) {}

  @Get()
  @Roles([Role.PLATFORM_OWNER])
  @UseGuards(JwtAuthGuard, RolesGuard)
  findAll() {
    return this.schoolOwnerService.findAll();
  }

  @Post()
  @Roles([Role.PLATFORM_OWNER])
  @UseGuards(JwtAuthGuard, RolesGuard)
  create(
    @Body(new ZodValidationPipe(CreateSchoolOwnerSchema))
    dto: CreateSchoolOwnerDto,
  ) {
    return this.schoolOwnerService.create(dto);
  }

  @Get('filter')
  @Roles([Role.PLATFORM_OWNER])
  @UseGuards(JwtAuthGuard, RolesGuard)
  filterByEmailOrUsername(@Query('search') search: string) {
    return this.schoolOwnerService.filter(search);
  }

  @Get(':id')
  @Roles([Role.PLATFORM_OWNER])
  @UseGuards(JwtAuthGuard, RolesGuard)
  findBy(@Param('id', ParseUUIDPipe) id: string) {
    return this.schoolOwnerService.findOne(id);
  }
}
