import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  ManyToOne,
  OneToOne,
  ManyToMany,
} from 'typeorm';
import { School } from './school.entity';
import { Teacher } from './teacherProfile.entity';
import { Student } from './studentProfile.entity';
import { Notification } from './notification.entity';

export enum Role {
  ADMIN = 'ADMIN',

  SCHOOLSUPERADMIN = 'SCHOOLSUPERADMIN',
  SHOOLADMIN = 'SCHOOLADMIN',
  TEACHER = 'TEACHER',
  STUDENT = 'STUDENT',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column()
  @Index()
  email!: string;

  @Column()
  address!: string;

  @Column()
  password!: string;

  @Column()
  imageUrl!: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.SCHOOLSUPERADMIN,
  })
  role!: Role;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @ManyToOne(() => School)
  school!: School;

  @OneToOne(() => Teacher)
  teacherProfile!: Teacher;

  @OneToOne(() => Student)
  studentProfile!: Student;

  @ManyToMany(() => Notification, (notification) => notification.school)
  notifications!: Notification[];
}
