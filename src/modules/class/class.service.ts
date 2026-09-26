import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClassEntity } from 'src/database/class.entity';
import { Student } from 'src/database/student.entity';
import { ClassTeacher } from 'src/database/class-teacher.entity';
import { School } from 'src/database/school.entity';
import { User } from 'src/database/user.entity';
import { Role } from 'src/database/enums';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { AddStudentDto } from './dto/add-student.dto';
import { AddTeacherDto } from './dto/add-teacher.dto';

@Injectable()
export class ClassService {
  public constructor(
    @InjectRepository(ClassEntity)
    private readonly classRepository: Repository<ClassEntity>,
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
    @InjectRepository(ClassTeacher)
    private readonly classTeacherRepository: Repository<ClassTeacher>,
    @InjectRepository(School)
    private readonly schoolRepository: Repository<School>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  private async getSchoolBySlug(schoolSlug: string): Promise<School> {
    const school = await this.schoolRepository.findOne({
      where: { slug: schoolSlug },
    });
    if (!school) throw new NotFoundException('School not found');
    return school;
  }

  async findAll(schoolSlug: string) {
    return this.classRepository.find({
      where: { school: { slug: schoolSlug } },

      relations: {
        students: true,
        teacherAssignments: true,
      },
      order: { level: 'ASC', number: 'ASC' },
    });
  }

  async findOne(classId: string, schoolSlug: string) {
    const classEntity = await this.classRepository.findOne({
      where: { id: classId, school: { slug: schoolSlug } },
      relations: {
        students: true,
        teacherAssignments: {
          teacher: true,
        },
      },
    });
    if (!classEntity) throw new NotFoundException('Class not found');
    return classEntity;
  }

  async create(dto: CreateClassDto, schoolSlug: string) {
    const school = await this.getSchoolBySlug(schoolSlug);
    const classEntity = this.classRepository.create({ ...dto, school });
    return this.classRepository.save(classEntity);
  }

  async update(classId: string, dto: UpdateClassDto, schoolSlug: string) {
    const classEntity = await this.findOne(classId, schoolSlug);
    Object.assign(classEntity, dto);
    return this.classRepository.save(classEntity);
  }

  async delete(classId: string, schoolSlug: string) {
    const classEntity = await this.findOne(classId, schoolSlug);
    await this.classRepository.remove(classEntity);
    return { message: 'Class deleted successfully' };
  }

  async addStudent(classId: string, dto: AddStudentDto, schoolSlug: string) {
    const classEntity = await this.findOne(classId, schoolSlug);
    const student = await this.studentRepository.findOne({
      where: { id: dto.studentId, school: { slug: schoolSlug } },
    });
    if (!student) throw new NotFoundException('Student not found');

    student.class = classEntity;
    return this.studentRepository.save(student);
  }

  async deleteStudent(classId: string, studentId: string, schoolSlug: string) {
    const student = await this.studentRepository.findOne({
      where: {
        id: studentId,
        class: { id: classId },
        school: { slug: schoolSlug },
      },
    });
    if (!student) {
      throw new NotFoundException('Student not found in this class');
    }

    student.class = null as unknown as ClassEntity;
    await this.studentRepository.save(student);
    return { message: 'Student removed from class successfully' };
  }

  async addTeacher(classId: string, dto: AddTeacherDto, schoolSlug: string) {
    const classEntity = await this.findOne(classId, schoolSlug);

    const teacher = await this.userRepository.findOne({
      where: {
        id: dto.teacherId,
        school: { slug: schoolSlug },
        role: Role.TEACHER,
      },
    });
    if (!teacher) throw new NotFoundException('Teacher not found');

    const existing = await this.classTeacherRepository.findOne({
      where: {
        class_id: classId,
        teacher_id: dto.teacherId,
        module: dto.module,
      },
    });
    if (existing) {
      throw new ConflictException(
        'Teacher already assigned to this module in this class',
      );
    }

    const assignment = this.classTeacherRepository.create({
      class_id: classId,
      teacher_id: dto.teacherId,
      module: dto.module,
      class: classEntity,
      teacher,
    });
    return this.classTeacherRepository.save(assignment);
  }

  async deleteTeacher(classId: string, teacherId: string, schoolSlug: string) {
    await this.findOne(classId, schoolSlug); // ensures class belongs to this school

    const assignment = await this.classTeacherRepository.findOne({
      where: { class_id: classId, teacher_id: teacherId },
    });
    if (!assignment) {
      throw new NotFoundException(
        'Teacher assignment not found for this class',
      );
    }

    await this.classTeacherRepository.remove(assignment);
    return { message: 'Teacher removed from class successfully' };
  }
}
