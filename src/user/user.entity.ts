import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { School } from 'src/school/school.entity';
import { Class } from 'src/school/class.entity';

export enum Role {
  PLATFORM_ADMIN = 'platform_admin',
  SCHOOL_WONER = 'school_woner',
  ADMIN = 'admin',
  TEACHER = 'teacher',
  PARENT = 'parent',
}

export enum Module {
  ARABIC = 'arabic',
  FRENCH = 'french',
  ENGLISH = 'english',
  AMAZIGH = 'amazigh',
  GERMAN = 'german',
  SPANISH = 'spanish',
  ITALIAN = 'italian',
  MATH = 'math',
  PHYSICS = 'physics',
  CHEMISTRY = 'chemistry',
  NATURAL_SCIENCES = 'natural_sciences',
  HISTORY_GEOGRAPHY = 'history_geography',
  ISLAMIC_EDUCATION = 'islamic_education',
  CIVIC_EDUCATION = 'civic_education',
  PHILOSOPHY = 'philosophy',
  COMPUTER_SCIENCE = 'computer_science',
  TECHNOLOGY = 'technology',
  ECONOMICS = 'economics',
  ACCOUNTING_AND_FINANCE = 'accounting_and_finance',
  LAW = 'law',
  FINE_ARTS = 'fine_arts',
  MUSIC = 'music',
}

@Entity()
@Unique(['email', 'school'])
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column()
  email!: string;

  @Column()
  password!: string;

  @Column({ nullable: true })
  avatarUrl!: string;

  @Column({ type: 'enum', enum: Role })
  role!: Role;

  @Column({ type: 'enum', enum: Module, nullable: true })
  module!: Module;

  @ManyToOne(() => School)
  school!: School;

  @ManyToMany(() => Class, { onDelete: 'CASCADE' })
  @JoinTable()
  classes!: Class[];
}
