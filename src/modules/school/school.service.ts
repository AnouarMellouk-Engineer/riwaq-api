import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { School } from 'src/database/school.entity';
import { Status } from 'src/database/enums';
import { Role } from 'src/database/enums';
import { Repository } from 'typeorm';
import { CreateSchoolDto } from './dto/school.dto';

@Injectable()
export class SchoolService {
  public constructor(
    @InjectRepository(School) private readonly schoolRepo: Repository<School>,
  ) {}

  public async create(dto: CreateSchoolDto): Promise<School> {
    const existing = await this.schoolRepo.findOne({
      where: { slug: dto.slug },
    });

    if (existing) {
      throw new ConflictException('school name  already in use');
    }

    const school = this.schoolRepo.create(dto);
    return this.schoolRepo.save(school);
  }

  public async findAllWithOwners(): Promise<School[]> {
    return this.schoolRepo
      .createQueryBuilder('school')
      .leftJoinAndSelect('school.users', 'owner', 'owner.role = :role', {
        role: Role.SCHOOL_OWNER,
      })
      .getMany();
  }

  public async findOne(id: string): Promise<School> {
    const school = await this.schoolRepo
      .createQueryBuilder('school')
      .leftJoinAndSelect('school.users', 'owner', 'owner.role = :role', {
        role: Role.SCHOOL_OWNER,
      })
      .leftJoinAndSelect('school.classes', 'classes')
      .leftJoinAndSelect('school.students', 'students')
      .where('school.id = :id', { id })
      .getOne();

    if (!school) {
      throw new NotFoundException(`School  not found`);
    }

    return school;
  }

  public async setStatus(id: string, status: Status): Promise<School> {
    const school = await this.schoolRepo.findOne({ where: { id } });

    if (!school) {
      throw new NotFoundException(`School  not found`);
    }

    school.status = status;
    return this.schoolRepo.save(school);
  }
}
