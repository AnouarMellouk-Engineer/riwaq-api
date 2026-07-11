import {
  Column,
  PrimaryGeneratedColumn,
  Entity,
  OneToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { User } from './user.entity';

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
}
