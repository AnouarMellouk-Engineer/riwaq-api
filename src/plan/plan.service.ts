import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePlanDto } from './dto/plan.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Plan } from 'src/entities/plan.entity';
import { Repository } from 'typeorm';
import { School } from 'src/entities/school.entity';

@Injectable()
export class PlanService {
  constructor(
    @InjectRepository(Plan) private planRepo: Repository<Plan>,
    @InjectRepository(School) private schoolRepo: Repository<School>,
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
    const school = await this.schoolRepo.findOneBy({
      plan: {
        id: id,
      },
    });

    if (school) {
      throw new ConflictException();
    }

    return await this.planRepo.delete(id);
  }
}
