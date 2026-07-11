import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Class } from './class.entity';

export enum Field {
  SCIENTIFIC = 'SCIENTIFIC',
  MATHEMATIC = 'MATHEMATIC',
  LANG = 'LANG',
}

@Entity()
export class ClassField {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'enum', enum: Field })
  field!: Field;

  @OneToOne(() => Class)
  @JoinColumn()
  @Index()
  class!: Class;
}
