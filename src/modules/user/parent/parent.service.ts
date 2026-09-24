import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { User } from 'src/database/user.entity';
import { Student } from 'src/database/student.entity';
import { School } from 'src/database/school.entity';
import { Role } from 'src/database/enums';
import {
  AssignChildrenDto,
  CreateParentDto,
  UpdateParentDto,
} from './dto/parent.dto';

@Injectable()
export class ParentService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    @InjectRepository(Student)
    private readonly studentRepo: Repository<Student>,
    @InjectRepository(School)
    private readonly schoolRepo: Repository<School>,
  ) {}

  private async resolveSchoolId(schoolSlug: string): Promise<string> {
    const school = await this.schoolRepo.findOne({
      where: { slug: schoolSlug },
    });
    if (!school) throw new NotFoundException('School not found');
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
    while (await this.userRepo.exists({ where: { username } })) {
      suffix += 1;
      username = `${base}${suffix}`;
    }
    return username;
  }

  async create(schoolSlug: string, dto: CreateParentDto) {
    const school_id = await this.resolveSchoolId(schoolSlug);

    const existing = await this.userRepo.findOne({
      where: { email: dto.email, school_id },
    });
    if (existing) {
      throw new ConflictException(
        'A user with this email already exists in this school',
      );
    }

    const username = await this.generateUsername(dto.first_name, dto.last_name);

    const parent = this.userRepo.create({
      ...dto,
      username,
      role: Role.PARENT,
      school_id,
    });

    return this.userRepo.save(parent);
  }

  async findAll(schoolSlug: string) {
    const school_id = await this.resolveSchoolId(schoolSlug);

    return this.userRepo.find({
      where: { school_id, role: Role.PARENT },
      relations: { children: true },
      order: { first_name: 'ASC' },
    });
  }

  async findOne(schoolSlug: string, id: string) {
    const school_id = await this.resolveSchoolId(schoolSlug);

    const parent = await this.userRepo.findOne({
      where: { id, school_id, role: Role.PARENT },
      relations: { children: true },
    });

    if (!parent) throw new NotFoundException('Parent not found');
    return parent;
  }

  async update(schoolSlug: string, id: string, dto: UpdateParentDto) {
    const parent = await this.findOne(schoolSlug, id);

    if (dto.email && dto.email !== parent.email) {
      const existing = await this.userRepo.findOne({
        where: { email: dto.email, school_id: parent.school_id! },
      });
      if (existing) {
        throw new ConflictException(
          'A user with this email already exists in this school',
        );
      }
    }

    Object.assign(parent, dto);
    return this.userRepo.save(parent);
  }

  async remove(schoolSlug: string, id: string) {
    const parent = await this.findOne(schoolSlug, id);

    // NOTE: requires Student.parent onDelete: 'SET NULL' (+ nullable: true).
    // With the current 'CASCADE' setting this will delete the parent's
    // children records too — fix the entity before relying on this.
    await this.userRepo.remove(parent);
    return { id };
  }

  async assignChildren(schoolSlug: string, id: string, dto: AssignChildrenDto) {
    const parent = await this.findOne(schoolSlug, id);
    const school_id = parent.school_id!;

    const students = await this.studentRepo.find({
      where: { id: In(dto.student_ids), school: { id: school_id } },
    });

    if (students.length !== dto.student_ids.length) {
      throw new NotFoundException(
        'One or more students were not found in this school',
      );
    }

    students.forEach((s) => (s.parent = parent));
    await this.studentRepo.save(students);

    return this.findOne(schoolSlug, id);
  }

  async removeChild(schoolSlug: string, id: string, studentId: string) {
    const parent = await this.findOne(schoolSlug, id);

    const student = await this.studentRepo.findOne({
      where: { id: studentId, parent: { id: parent.id } },
    });
    if (!student)
      throw new NotFoundException('Student not found for this parent');

    student.parent = null;
    await this.studentRepo.save(student);

    return { id: studentId };
  }
}
