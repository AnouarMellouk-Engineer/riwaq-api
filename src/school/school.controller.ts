import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
} from '@nestjs/common';
import { SchoolService } from './school.service';
import type { CreateSchoolDto } from './dto/school.dto';
import { ZodValidationPipe } from 'src/zodValidationPipe';
import schoolSchema from './dto/school.dto';

@Controller('schools')
export class SchoolController {
  constructor(private schooService: SchoolService) {}

  @Get()
  async get() {
    return await this.schooService.get();
  }

  @Get(':slug')
  async getBySlug(@Param('slug') slug: string) {
    return await this.schooService.getBySlug(slug);
  }

  @Post()
  @UsePipes(new ZodValidationPipe(schoolSchema))
  add(@Body() school: CreateSchoolDto) {
    return this.schooService.add(school);
  }

  @Put(':slug')
  @UsePipes(new ZodValidationPipe(schoolSchema))
  async update(
    @Param('slug') schoolSlug: string,
    @Body() school: CreateSchoolDto,
  ) {
    return await this.schooService.update(schoolSlug, school);
  }

  @Delete(':slug')
  async delete(@Param('slug') schoolSlug: string) {
    return await this.schooService.delete(schoolSlug);
  }
}
