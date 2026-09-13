import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Grade } from './enums';
import { School } from './school.entity';
import { Student } from './student.entity';
import { ClassTeacher } from './class-teacher.entity';

@Entity('classes')
export class ClassEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'enum', enum: Grade })
  grade!: Grade;

  @Column({ type: 'int' })
  level!: number;

  @Column({ type: 'int' })
  number!: number;

  @ManyToOne(() => School, (school) => school.classes, { onDelete: 'CASCADE' })
  school!: School;

  @OneToMany(() => Student, (student) => student.class)
  students!: Student[];

  @OneToMany(() => ClassTeacher, (classTeacher) => classTeacher.class)
  teacherAssignments!: ClassTeacher[];
}
