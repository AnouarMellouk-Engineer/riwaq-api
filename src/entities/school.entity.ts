import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Notification } from './notification.entity';
import { Class } from './class.entity';

export enum SubsriptionPlan {
  FREE = 'FREE',
  MONTH = 'MONTH',
  YEAR = 'YEAR',
}

export enum SubsriptionStatus {
  ACTIVE = 'ACTIVE',
  SUSPEND = 'SUSPEND',
}

@Entity()
export class School {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  slug!: string;

  @Column({ type: 'enum', enum: SubsriptionPlan })
  subcriptionPlan!: SubsriptionPlan;

  @Column({ type: 'enum', enum: SubsriptionStatus })
  SubsriptionStatus!: SubsriptionStatus;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @OneToMany(() => User, (user) => user.school)
  users!: User[];

  @OneToMany(() => Notification, (notification) => notification.school)
  notifications!: Notification[];

  @OneToMany(() => Class, (c) => c.school)
  classes!: Class[];
}
