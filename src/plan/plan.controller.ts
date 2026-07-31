import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import type { CreatePlanDto } from './dto/plan.dto';
import { PlanService } from './plan.service';
import planSchema from './dto/plan.dto';
import { ZodValidationPipe } from 'src/zodValidationPipe';

@Controller('plans')
export class PlanController {
  constructor(private planService: PlanService) {}

  @Get()
  async get() {
    return await this.planService.get();
  }

  @Get(':id')
  async getBy(@Param('id', ParseUUIDPipe) id: string) {
    return await this.planService.getBy(id);
  }

  @Post()
  async add(
    @Body(new ZodValidationPipe(planSchema)) createPlanDto: CreatePlanDto,
  ) {
    return await this.planService.add(createPlanDto);
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(new ZodValidationPipe(planSchema)) updatePlanDto: CreatePlanDto,
  ) {
    return await this.planService.update(id, updatePlanDto);
  }
  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    return await this.planService.delete(id);
  }
}
