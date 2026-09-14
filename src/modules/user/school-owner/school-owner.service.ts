import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/database/user.entity';
import { Role } from 'src/database/enums';
import { DataSource, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateSchoolOwnerDto } from './dto/school-owner.dto';
import { School } from 'src/database/school.entity';
import { ILike } from 'typeorm';

@Injectable()
export class SchoolOwnerService {
  public constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    private readonly dataSource: DataSource,
  ) {}

  public async create(dto: CreateSchoolOwnerDto): Promise<User> {
    const existing = await this.userRepo.findOne({
      where: { username: dto.username },
    });

    if (existing) {
      throw new ConflictException('Username already taken');
    }

    return this.dataSource.transaction(async (manager) => {
      const schoolRepo = manager.getRepository(School);

      const existingSlug = await schoolRepo.findOne({
        where: { slug: dto.school.slug },
      });
      if (existingSlug) {
        throw new ConflictException('school name  already in use');
      }

      const school = await schoolRepo.save(schoolRepo.create(dto.school));
      const hashedPassword = await bcrypt.hash(dto.password, 10);

      const userRepo = manager.getRepository(User);

      const schoolOwner = userRepo.create({
        first_name: dto.first_name,
        last_name: dto.last_name,
        email: dto.email,
        username: dto.username,
        password: hashedPassword,
        address: dto.address,
        phone_number: dto.phone_number,
        avatar_url: dto.avatar_url,
        role: Role.SCHOOL_OWNER,
        school_id: school.id,
      });

      return userRepo.save(schoolOwner);
    });
  }

  public async findAll(): Promise<User[]> {
    return this.userRepo.find({ where: { role: Role.SCHOOL_OWNER } });
  }

  public async findOne(id: string): Promise<User> {
    const schoolOwner = await this.userRepo.findOne({
      where: { id, role: Role.SCHOOL_OWNER },
    });

    if (!schoolOwner) {
      throw new NotFoundException(`School owner  not found`);
    }

    return schoolOwner;
  }

  public async filter(search: string): Promise<User[]> {
    return this.userRepo.find({
      where: [
        { username: ILike(`%${search}%`), role: Role.SCHOOL_OWNER },
        { email: ILike(`%${search}%`), role: Role.SCHOOL_OWNER },
      ],
    });
  }
}
