import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
} from '@nestjs/common';
import { SchoolOwnerService } from './school-owner.service';
import {
  CreateSchoolOwnerSchema,
  type CreateSchoolOwnerDto,
} from './dto/school-owner.dto';
import { ZodValidationPipe } from 'src/common/pipes/zodValidation.pipe';

@Controller('users/school-owners')
export class SchoolOwnerController {
  public constructor(private readonly schoolOwnerService: SchoolOwnerService) {}

  @Get()
  findAll() {
    return this.schoolOwnerService.findAll();
  }

  @Post()
  create(
    @Body(new ZodValidationPipe(CreateSchoolOwnerSchema))
    dto: CreateSchoolOwnerDto,
  ) {
    return this.schoolOwnerService.create(dto);
  }
  @Get('filter')
  filterByEmailOrUsername(@Query('search') search: string) {
    return this.schoolOwnerService.filter(search);
  }

  @Get(':id')
  findBy(@Param('id', ParseUUIDPipe) id: string) {
    return this.schoolOwnerService.findOne(id);
  }
}
