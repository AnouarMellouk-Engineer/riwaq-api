import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { School } from './school.entity';
import { Repository } from 'typeorm';
import type { CreateSchoolDto } from './dto/school.dto';

@Injectable()
export class SchoolService {
  constructor(
    @InjectRepository(School) private schoolRepo: Repository<School>,
  ) {}

  async get() {
    return await this.schoolRepo.find();
  }

  async getBySlug(slug: string) {
    const school = await this.schoolRepo.findOne({
      where: { slug },
      relations: {
        plan: true,
        classes: true,
      },
    });

    if (!school) {
      throw new NotFoundException();
    }

    return school;
  }

  add(school: CreateSchoolDto) {
    return this.schoolRepo.save(school);
  }

  async update(slug: string, updateSchoolDto: CreateSchoolDto) {
    const school = await this.schoolRepo.findOneBy({ slug });

    if (!school) {
      throw new NotFoundException();
    }

    return await this.schoolRepo.update({ slug }, updateSchoolDto);
  }

  async delete(slug: string) {
    const school = await this.schoolRepo.findOneBy({ slug });

    if (!school) {
      throw new NotFoundException();
    }

    return await this.schoolRepo.delete({ slug });
  }

  async existsByPlanId(planId: string): Promise<boolean> {
    return this.schoolRepo.existsBy({ plan: { id: planId } });
  }
}
