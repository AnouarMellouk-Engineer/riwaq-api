import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { School } from './school.entity';
import { ClassField } from './classField.entity';

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
}
