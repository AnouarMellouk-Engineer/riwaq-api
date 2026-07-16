import {
  Column,
  PrimaryGeneratedColumn,
  Entity,
  OneToOne,
  JoinColumn,
  Index,
  OneToMany,
} from 'typeorm';
import { User } from './user.entity';
import { TeachingAssignement } from './teachingAssignement.entity';

export enum Module {
  ARABIC = 'ARABIC',
  FRANCH = 'FRANCH',
  MATH = 'MATH',
  PHISICS = 'PHISICS',
}

@Entity()
export class Teacher {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'enum', enum: Module })
  module!: Module;

  @OneToOne(() => User)
  @JoinColumn()
  @Index()
  user!: User;

  @OneToMany(() => TeachingAssignement, (c) => c.teacher)
  classes!: TeachingAssignement[];
}
