import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { ZodValidationPipe } from 'src/common/pipes/zodValidationPipe';
import createStudentSchema from './dto/createStudent.dto';
import type { CreateStudentDto } from './dto/createStudent.dto';
import modifyStudentSchema from './dto/modifyStudent.dto';
import type { ModifyStudentDto } from './dto/modifyStudent.dto';

@Controller('schools/:schoolSlug/students')
export class StudentController {
  constructor(private studentService: StudentService) {}

  @Get()
  async get(@Param('schoolSlug') schoolSlug: string) {
    return await this.studentService.get(schoolSlug);
  }

  @Get(':id')
  async getById(
    @Param('schoolSlug') schoolSlug: string,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return await this.studentService.getById(schoolSlug, id);
  }

  @Post()
  async add(
    @Param('schoolSlug') schoolSlug: string,
    @Body(new ZodValidationPipe(createStudentSchema))
    createStudentDto: CreateStudentDto,
  ) {
    return await this.studentService.add(schoolSlug, createStudentDto);
  }

  @Put(':id')
  async update(
    @Param('schoolSlug') schoolSlug: string,
    @Param('id', ParseUUIDPipe) id: string,
    @Body(new ZodValidationPipe(modifyStudentSchema))
    modifyStudentDto: ModifyStudentDto,
  ) {
    return await this.studentService.update(schoolSlug, id, modifyStudentDto);
  }

  @Delete(':id')
  async delete(
    @Param('schoolSlug') schoolSlug: string,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return await this.studentService.delete(schoolSlug, id);
  }
}
