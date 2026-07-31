import { Module } from '@nestjs/common';
import { PlanController } from './plan.controller';
import { PlanService } from './plan.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Plan } from 'src/entities/plan.entity';
import { School } from 'src/entities/school.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Plan, School])],
  controllers: [PlanController],
  providers: [PlanService],
})
export class PlanModule {}
