import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role, User } from '../user.entity';
import { Repository } from 'typeorm';
import { CareateSchoolWonerDto } from './dto/createSchoolWoner.dto';
import { ModifySchoolWonerDto } from './dto/modifySchoolWoner.dto';
import { SchoolService } from 'src/school/school.service';
import * as bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

@Injectable()
export class SchoolOwnerService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private schoolService: SchoolService,
  ) {}

  async getByid(schoolSlug: string, id: string) {
    const schoolOwner = await this.userRepo.findOne({
      where: {
        school: {
          slug: schoolSlug,
        },
        id,
        role: Role.SCHOOL_WONER,
      },
      select: {
        firstName: true,
        lastName: true,
        email: true,
        avatarUrl: true,
      },
    });

    if (!schoolOwner) {
      throw new NotFoundException();
    }

    return schoolOwner;
  }

  async add(schoolSlug: string, createSchoolWonerDto: CareateSchoolWonerDto) {
    const school = await this.schoolService.getBySlug(schoolSlug);

    const emailTaken = await this.userRepo.existsBy({
      email: createSchoolWonerDto.email,
      school: { id: school.id },
    });

    if (emailTaken) {
      throw new ConflictException();
    }

    const hashedPassword = await bcrypt.hash(
      createSchoolWonerDto.password,
      SALT_ROUNDS,
    );

    return await this.userRepo.save({
      ...createSchoolWonerDto,
      password: hashedPassword,
      role: Role.SCHOOL_WONER,
      school,
    });
  }

  async modify(
    schoolSlug: string,
    id: string,
    modifySchoolWonerDto: ModifySchoolWonerDto,
  ) {
    const schoolOwner = await this.userRepo.existsBy({
      id,
      role: Role.SCHOOL_WONER,
      school: { slug: schoolSlug },
    });

    if (!schoolOwner) {
      throw new NotFoundException();
    }

    return await this.userRepo.update(id, modifySchoolWonerDto);
  }
}
