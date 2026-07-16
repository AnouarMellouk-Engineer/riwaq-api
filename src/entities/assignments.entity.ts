import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TeachingAssignement } from './teachingAssignement.entity';

@Entity()
export class Assignments {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column()
  content!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @ManyToOne(() => TeachingAssignement, (tt) => tt.assignments)
  teachingAssignenment!: TeachingAssignement;
}
