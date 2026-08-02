import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { School } from './school.entity';
import { User } from 'src/user/user.entity';

export enum Level {
  PRIMARY = 'primary',
  MIDDLE = 'middle',
  SECONDARY = 'secondary',
}

export enum Year {
  FIRST = '1st',
  SECOND = '2nd',
  THIRD = '3rd',
  FOURTH = '4th',
  FIFTH = '5th',
}

@Entity()
export class Class {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'enum', enum: Level })
  level!: Level;

  @Column({ type: 'enum', enum: Year })
  year!: Year;

  @Column('int')
  number!: number;

  @ManyToOne(() => School, { onDelete: 'CASCADE' })
  school!: School;

  @ManyToMany(() => User, { onDelete: 'SET NULL' })
  teachers!: User[];
}
