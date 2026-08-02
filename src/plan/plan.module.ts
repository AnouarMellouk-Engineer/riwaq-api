import { Module } from '@nestjs/common';
import { PlanController } from './plan.controller';
import { PlanService } from './plan.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Plan } from './plan.entity';
import { SchoolModule } from 'src/school/school.module';

@Module({
  imports: [TypeOrmModule.forFeature([Plan]), SchoolModule],
  controllers: [PlanController],
  providers: [PlanService],
})
export class PlanModule {}
