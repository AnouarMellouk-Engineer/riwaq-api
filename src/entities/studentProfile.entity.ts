import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Class } from './class.entity';

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id!: number;

  @OneToOne(() => User)
  @JoinColumn()
  @Index()
  user!: User;

  @ManyToOne(() => Class, (c) => c.students)
  classs!: Class;
}
