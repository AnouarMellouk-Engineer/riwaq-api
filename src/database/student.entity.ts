import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Status, StudentGender } from './enums';
import { School } from './school.entity';
import { User } from './user.entity';
import { ClassEntity } from './class.entity';

@Entity('students')
export class Student {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar' })
  first_name!: string;

  @Column({ type: 'varchar' })
  last_name!: string;

  @Column({ type: 'date' })
  date_of_birth!: Date;

  @Column({ type: 'varchar' })
  address!: string;

  @Column({ type: 'varchar', nullable: true })
  avatar_url!: string;

  @Column({ type: 'enum', enum: StudentGender })
  gender!: StudentGender;

  @Column({ type: 'enum', enum: Status, default: Status.ACTIVE })
  status!: Status;

  @ManyToOne(() => School, (school) => school.students, {
    onDelete: 'CASCADE',
  })
  school!: School;

  @ManyToOne(() => User, (user) => user.children, { onDelete: 'CASCADE' })
  parent!: User;

  @ManyToOne(() => ClassEntity, (classEntity) => classEntity.students, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  class!: ClassEntity;
}
