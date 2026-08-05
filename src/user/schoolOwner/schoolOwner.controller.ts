import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Put,
} from '@nestjs/common';
import { SchoolOwnerService } from './schoolOwner.service';
import { ZodValidationPipe } from 'src/common/pipes/zodValidationPipe';
import modifySchoolWonerSchema from './dto/modifySchoolWoner.dto';
import type { ModifySchoolWonerDto } from './dto/modifySchoolWoner.dto';

@Controller('schools/:schoolSlug/owners')
export class SchoolOwnerController {
  constructor(private schoolOwnerService: SchoolOwnerService) {}

  @Get(':id')
  async getById(
    @Param('schoolSlug') schoolSlug: string,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return await this.schoolOwnerService.getByid(schoolSlug, id);
  }

  @Put(':id')
  async modify(
    @Param('schoolSlug') schoolSlug: string,
    @Param('id', ParseUUIDPipe) id: string,
    @Body(new ZodValidationPipe(modifySchoolWonerSchema))
    modifySchoolWonerDto: ModifySchoolWonerDto,
  ) {
    return await this.schoolOwnerService.modify(
      schoolSlug,
      id,
      modifySchoolWonerDto,
    );
  }
}
