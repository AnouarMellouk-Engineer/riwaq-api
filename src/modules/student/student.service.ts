import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from 'src/database/student.entity';
import { School } from 'src/database/school.entity';
import { User } from 'src/database/user.entity';
import { ClassEntity } from 'src/database/class.entity';
import { Role } from 'src/database/enums';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { ChangeStatusDto } from './dto/change-status.dto';
import { SignParentDto } from './dto/sign-parent.dto';

@Injectable()
export class StudentService {
  public constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
    @InjectRepository(School)
    private readonly schoolRepository: Repository<School>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(ClassEntity)
    private readonly classRepository: Repository<ClassEntity>,
  ) {}

  private async getSchoolBySlug(schoolSlug: string): Promise<School> {
    const school = await this.schoolRepository.findOne({
      where: { slug: schoolSlug },
    });
    if (!school) throw new NotFoundException('School not found');
    return school;
  }

  async findAll(schoolSlug: string) {
    return this.studentRepository.find({
      where: { school: { slug: schoolSlug } },
      relations: {
        class: true,
        parent: true,
      },
      order: { last_name: 'ASC', first_name: 'ASC' },
    });
  }

  async findOne(studentId: string, schoolSlug: string) {
    const student = await this.studentRepository.findOne({
      where: { id: studentId, school: { slug: schoolSlug } },
      relations: {
        class: true,
        parent: true,
      },
    });
    if (!student) throw new NotFoundException('Student not found');
    return student;
  }

  async create(dto: CreateStudentDto, schoolSlug: string) {
    const school = await this.getSchoolBySlug(schoolSlug);

    let classEntity: ClassEntity | null = null;
    if (dto.classId) {
      classEntity = await this.classRepository.findOne({
        where: { id: dto.classId, school: { slug: schoolSlug } },
      });
      if (!classEntity) throw new NotFoundException('Class not found');
    }

    const { classId, ...rest } = dto;
    const student = this.studentRepository.create({
      ...rest,
      school,
      class: classEntity as ClassEntity,
    });
    return this.studentRepository.save(student);
  }

  async update(studentId: string, dto: UpdateStudentDto, schoolSlug: string) {
    const student = await this.findOne(studentId, schoolSlug);

    const { classId, ...rest } = dto;

    if (classId !== undefined) {
      const classEntity = await this.classRepository.findOne({
        where: { id: classId, school: { slug: schoolSlug } },
      });
      if (!classEntity) throw new NotFoundException('Class not found');
      student.class = classEntity;
    }

    Object.assign(student, rest);
    return this.studentRepository.save(student);
  }

  async changeStatus(
    studentId: string,
    dto: ChangeStatusDto,
    schoolSlug: string,
  ) {
    const student = await this.findOne(studentId, schoolSlug);
    student.status = dto.status;
    return this.studentRepository.save(student);
  }

  async signToParent(
    studentId: string,
    dto: SignParentDto,
    schoolSlug: string,
  ) {
    const student = await this.findOne(studentId, schoolSlug);

    const parent = await this.userRepository.findOne({
      where: {
        id: dto.parentId,
        school: { slug: schoolSlug },
        role: Role.PARENT,
      },
    });
    if (!parent) throw new NotFoundException('Parent not found');

    student.parent = parent;
    return this.studentRepository.save(student);
  }

  async removeParent(studentId: string, schoolSlug: string) {
    const student = await this.findOne(studentId, schoolSlug);

    if (!student.parent) {
      throw new BadRequestException('This student has no parent assigned');
    }

    student.parent = null;
    await this.studentRepository.save(student);
    return { message: 'Parent removed from student successfully' };
  }
}
