import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
  Unique,
} from 'typeorm';
import { Role, UserStatus } from './enums';
import { School } from './school.entity';
import { Student } from './student.entity';
import { TeacherModule } from './teacher-module.entity';
import { ClassTeacher } from './class-teacher.entity';

@Entity('users')
@Unique(['email', 'school_id'])
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar' })
  first_name!: string;

  @Column({ type: 'varchar' })
  last_name!: string;

  @Column({ type: 'varchar' })
  email!: string;

  @Column({ type: 'varchar' })
  address!: string;

  @Column({ type: 'varchar', nullable: true })
  avatar_url!: string;

  @Column({ type: 'varchar', select: false })
  password!: string;

  @Column({ type: 'enum', enum: Role, default: Role.PARENT })
  role!: Role;

  @Column({ type: 'varchar', unique: true })
  username!: string;

  @Column({ type: 'enum', enum: UserStatus, default: UserStatus.INVITED })
  status!: UserStatus;

  @Column({ type: 'varchar' })
  phone_number!: string;

  @ManyToOne(() => School, (school) => school.users, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'school_id' })
  school!: School;

  @Column({ type: 'uuid', nullable: true })
  school_id!: string | null;

  @OneToMany(() => Student, (student) => student.parent)
  children!: Student[];

  @OneToMany(() => TeacherModule, (teacherModule) => teacherModule.teacher)
  teacherModules!: TeacherModule[];

  @OneToMany(() => ClassTeacher, (classTeacher) => classTeacher.teacher)
  classAssignments!: ClassTeacher[];
}
