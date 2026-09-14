import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
} from '@nestjs/common';
import { SchoolService } from './school.service';
import { ZodValidationPipe } from 'src/common/pipes/zodValidation.pipe';
import type { UpdateSchoolStatusDto } from './dto/update-school-status.dto';

import { UpdateSchoolStatusSchema } from './dto/update-school-status.dto';

@Controller('schools')
export class SchoolController {
  public constructor(private readonly schoolService: SchoolService) {}

  @Get()
  findAll() {
    return this.schoolService.findAllWithOwners();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.schoolService.findOne(id);
  }

  @Patch(':id/status')
  updateStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(new ZodValidationPipe(UpdateSchoolStatusSchema))
    dto: UpdateSchoolStatusDto,
  ) {
    return this.schoolService.setStatus(id, dto.status);
  }
}
