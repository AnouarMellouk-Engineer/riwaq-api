import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { Status } from './enums';
import { User } from './user.entity';
import { ClassEntity } from './class.entity';
import { Student } from './student.entity';
import { Invoice } from './invoice.entity';

@Entity('schools')
export class School {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar' })
  name!: string;

  @Column({ type: 'varchar', unique: true })
  slug!: string;

  @Column({ type: 'enum', enum: Status, default: Status.ACTIVE })
  status!: Status;

  @CreateDateColumn({ type: 'timestamp' })
  created_at!: Date;

  @OneToMany(() => User, (user) => user.school)
  users!: User[];

  @OneToMany(() => ClassEntity, (classEntity) => classEntity.school)
  classes!: ClassEntity[];

  @OneToMany(() => Student, (student) => student.school)
  students!: Student[];

  @OneToMany(() => Invoice, (invoice) => invoice.school)
  invoices!: Invoice[];
}
