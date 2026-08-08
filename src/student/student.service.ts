import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from 'src/school/student.entity';
import { Class } from 'src/school/class.entity';
import { Role, User } from 'src/user/user.entity';
import { SchoolService } from 'src/school/school.service';
import type { CreateStudentDto } from './dto/createStudent.dto';
import type { ModifyStudentDto } from './dto/modifyStudent.dto';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student) private studentRepo: Repository<Student>,
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Class) private classRepo: Repository<Class>,
    private schoolService: SchoolService,
  ) {}

  async get(schoolSlug: string) {
    return await this.studentRepo.find({
      where: { school: { slug: schoolSlug } },
      relations: { class: true },
    });
  }

  async getById(schoolSlug: string, id: string) {
    const student = await this.studentRepo.findOne({
      where: { id, school: { slug: schoolSlug } },
      relations: { class: true, parent: true },
    });

    if (!student) {
      throw new NotFoundException();
    }

    return student;
  }

  async add(schoolSlug: string, createStudentDto: CreateStudentDto) {
    const school = await this.schoolService.getBySlug(schoolSlug);

    const parent = await this.userRepo.findOneBy({
      id: createStudentDto.parentId,
      role: Role.PARENT,
      school: { id: school.id },
    });

    if (!parent) {
      throw new NotFoundException();
    }

    let classEntity: Class | null = null;

    if (createStudentDto.classId) {
      classEntity = await this.classRepo.findOneBy({
        id: createStudentDto.classId,
        school: { id: school.id },
      });

      if (!classEntity) {
        throw new NotFoundException();
      }
    }

    const student = this.studentRepo.create({
      firstName: createStudentDto.firstName,
      lastName: createStudentDto.lastName,
      dateOfBirth: createStudentDto.dateOfBirth,
      school,
      parent,
      ...(classEntity ? { class: classEntity } : {}),
    });

    return await this.studentRepo.save(student);
  }

  async update(
    schoolSlug: string,
    id: string,
    modifyStudentDto: ModifyStudentDto,
  ) {
    const school = await this.schoolService.getBySlug(schoolSlug);

    const student = await this.studentRepo.findOneBy({
      id,
      school: { id: school.id },
    });

    if (!student) {
      throw new NotFoundException();
    }

    const { parentId, classId, ...rest } = modifyStudentDto;

    if (parentId) {
      const parent = await this.userRepo.findOneBy({
        id: parentId,
        role: Role.PARENT,
        school: { id: school.id },
      });

      if (!parent) {
        throw new NotFoundException();
      }

      student.parent = parent;
    }

    if (classId) {
      const classEntity = await this.classRepo.findOneBy({
        id: classId,
        school: { id: school.id },
      });

      if (!classEntity) {
        throw new NotFoundException();
      }

      student.class = classEntity;
    }

    Object.assign(student, rest);

    return await this.studentRepo.save(student);
  }

  async delete(schoolSlug: string, id: string) {
    const school = await this.schoolService.getBySlug(schoolSlug);

    const student = await this.studentRepo.findOneBy({
      id,
      school: { id: school.id },
    });

    if (!student) {
      throw new NotFoundException();
    }

    return await this.studentRepo.delete(id);
  }
}
