import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Plan } from 'src/plan/plan.entity';
import { Class } from './class.entity';

export enum SchoolStatus {
  ACTIVE = 'active',
  SUSPEND = 'suspend',
}
@Entity()
export class School {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('varchar')
  name!: string;

  @Column({ type: 'varchar', unique: true })
  slug!: string;

  @Column({ type: 'enum', enum: SchoolStatus, default: SchoolStatus.ACTIVE })
  status!: SchoolStatus;

  @CreateDateColumn()
  createdAt!: Date;

  @ManyToOne(() => Plan)
  plan!: Plan;

  @OneToMany(() => Class, (c) => c.school)
  classes!: Class[];
}
