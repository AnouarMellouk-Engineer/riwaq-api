import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePlanDto } from './dto/plan.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Plan } from './plan.entity';
import { Repository } from 'typeorm';
import { SchoolService } from 'src/school/school.service';

@Injectable()
export class PlanService {
  constructor(
    @InjectRepository(Plan) private planRepo: Repository<Plan>,
    private schoolService: SchoolService,
  ) {}

  async add(createPlanDto: CreatePlanDto) {
    const planExist = await this.planRepo.findOneBy({
      name: createPlanDto.name,
    });

    if (planExist) {
      throw new BadRequestException();
    }

    return await this.planRepo.save(createPlanDto);
  }

  async get() {
    return await this.planRepo.find();
  }

  async getBy(id: string) {
    const plan = await this.planRepo.findOne({
      where: {
        id: id,
      },
      relations: {
        schools: true,
      },
    });

    if (plan) {
      return plan;
    }
    throw new NotFoundException();
  }

  async update(id: string, updatePlanDto: CreatePlanDto) {
    return await this.planRepo.update(id, updatePlanDto);
  }

  async delete(id: string) {
    const inUse = await this.schoolService.existsByPlanId(id);

    if (inUse) {
      throw new ConflictException();
    }

    return await this.planRepo.delete(id);
  }
}
