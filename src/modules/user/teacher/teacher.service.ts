import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/database/user.entity';
import { School } from 'src/database/school.entity';
import { TeacherModule as TeacherModuleEntity } from 'src/database/teacher-module.entity';
import { ModuleName, Role, UserStatus } from 'src/database/enums';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { ChangeStatusDto } from '../admin/dto/change-status.dto';
import { AddModuleDto } from './dto/add-module.dto';

@Injectable()
export class TeacherService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(School)
    private readonly schoolRepository: Repository<School>,
    @InjectRepository(TeacherModuleEntity)
    private readonly teacherModuleRepository: Repository<TeacherModuleEntity>,
  ) {}

  private async resolveSchoolId(schoolSlug: string): Promise<string> {
    const school = await this.schoolRepository.findOne({
      where: { slug: schoolSlug },
    });
    if (!school) {
      throw new NotFoundException('School not found');
    }
    return school.id;
  }

  private async generateUsername(firstName: string, lastName: string) {
    const base = `${firstName}.${lastName}`
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9.]/g, '');

    let username = base;
    let suffix = 0;
    while (await this.userRepository.exists({ where: { username } })) {
      suffix += 1;
      username = `${base}${suffix}`;
    }
    return username;
  }

  async findAll(schoolSlug: string): Promise<User[]> {
    const schoolId = await this.resolveSchoolId(schoolSlug);

    return this.userRepository.find({
      where: { school_id: schoolId, role: Role.TEACHER },
      relations: { teacherModules: true },
      order: { first_name: 'ASC' },
    });
  }

  async findById(schoolSlug: string, teacherId: string): Promise<User> {
    const teacher = await this.userRepository.findOne({
      where: {
        id: teacherId,
        role: Role.TEACHER,
        school: { slug: schoolSlug },
      },
      relations: { school: true, teacherModules: true },
    });

    if (!teacher) {
      throw new NotFoundException('Teacher not found');
    }

    return teacher;
  }

  async create(schoolSlug: string, dto: CreateTeacherDto): Promise<User> {
    const schoolId = await this.resolveSchoolId(schoolSlug);
    const { modules, ...profile } = dto;

    const existing = await this.userRepository.findOne({
      where: [
        { email: profile.email, school_id: schoolId },
        { username: profile.username },
      ],
    });
    if (existing) {
      throw new ConflictException(
        'A user with this email or username already exists',
      );
    }

    const username = await this.generateUsername(dto.first_name, dto.last_name);
    const teacher = this.userRepository.create({
      ...profile,
      username: username,
      role: Role.TEACHER,
      status: UserStatus.INVITED,
      school_id: schoolId,
    });
    const saved = await this.userRepository.save(teacher);

    if (modules?.length) {
      const uniqueModules = [...new Set(modules)];
      await this.teacherModuleRepository.save(
        uniqueModules.map((module) =>
          this.teacherModuleRepository.create({
            teacher_id: saved.id,
            module,
          }),
        ),
      );
    }

    return this.findById(schoolSlug, saved.id);
  }

  async modify(
    schoolSlug: string,
    teacherId: string,
    dto: UpdateTeacherDto,
  ): Promise<User> {
    const teacher = await this.findById(schoolSlug, teacherId);
    Object.assign(teacher, dto);
    return this.userRepository.save(teacher);
  }

  async changeStatus(
    schoolSlug: string,
    teacherId: string,
    dto: ChangeStatusDto,
  ): Promise<User> {
    const teacher = await this.findById(schoolSlug, teacherId);
    teacher.status = dto.status;
    return this.userRepository.save(teacher);
  }

  async delete(
    schoolSlug: string,
    teacherId: string,
  ): Promise<{ message: string }> {
    const teacher = await this.findById(schoolSlug, teacherId);
    await this.userRepository.remove(teacher);
    return { message: 'Teacher deleted successfully' };
  }

  async addModule(
    schoolSlug: string,
    teacherId: string,
    dto: AddModuleDto,
  ): Promise<TeacherModuleEntity> {
    const teacher = await this.findById(schoolSlug, teacherId);

    const existing = await this.teacherModuleRepository.findOne({
      where: { teacher_id: teacher.id, module: dto.module },
    });
    if (existing) {
      throw new ConflictException('Teacher already has this module');
    }

    const teacherModule = this.teacherModuleRepository.create({
      teacher_id: teacher.id,
      module: dto.module,
    });
    return this.teacherModuleRepository.save(teacherModule);
  }

  async deleteModule(
    schoolSlug: string,
    teacherId: string,
    moduleId: ModuleName,
  ): Promise<{ message: string }> {
    const teacher = await this.findById(schoolSlug, teacherId);

    const teacherModule = await this.teacherModuleRepository.findOne({
      where: { teacher_id: teacher.id, module: moduleId },
    });
    if (!teacherModule) {
      throw new NotFoundException('Module assignment not found');
    }

    await this.teacherModuleRepository.remove(teacherModule);
    return { message: 'Module removed successfully' };
  }
}
