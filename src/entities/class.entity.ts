import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { School } from './school.entity';
import { ClassField } from './classField.entity';
import { Student } from './studentProfile.entity';
import { TeachingAssignement } from './teachingAssignement.entity';

export enum Stage {
  PRIMARY = 'PRIMARY',
  MIDDLE = 'MIDDLE',
  SECONDARY = 'SECONDARY',
}

@Entity()
export class Class {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column()
  section!: number;

  @Column({ type: 'enum', enum: Stage })
  educationStage!: Stage;

  @Column()
  grade!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @ManyToOne(() => School)
  school!: School;

  @OneToOne(() => ClassField)
  classFiled!: ClassField;

  @OneToMany(() => Student, (student) => student.classs)
  students!: Student[];

  @OneToMany(() => TeachingAssignement, (t) => t.classs)
  teachers!: TeachingAssignement[];
}
