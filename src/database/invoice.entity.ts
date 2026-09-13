import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { PaymentMethod } from './enums';
import { Plan } from './plan.entity';
import { School } from './school.entity';

@Entity('invoices')
export class Invoice {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'uuid' })
  plan_id!: string;

  @Column({ type: 'uuid' })
  school_id!: string;

  @Column({ type: 'timestamp' })
  start_date!: Date;

  @Column({ type: 'timestamp' })
  end_date!: Date;

  @Column({ type: 'enum', enum: PaymentMethod })
  payment_method!: PaymentMethod;

  @Column({ type: 'float' })
  total!: number;

  @ManyToOne(() => Plan, (plan) => plan.invoices)
  @JoinColumn({ name: 'plan_id' })
  plan!: Plan;

  @ManyToOne(() => School, (school) => school.invoices, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'school_id' })
  school!: School;
}
