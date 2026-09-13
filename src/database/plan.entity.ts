import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { PlanName } from './enums';
import { PlanFeature } from './plan-feature.entity';
import { Invoice } from './invoice.entity';

@Entity('plans')
export class Plan {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'enum', enum: PlanName })
  name!: PlanName;

  @Column({ type: 'float' })
  price!: number;

  @Column({ type: 'int' })
  nbr_students!: number;

  @Column({ type: 'int' })
  nbr_parents!: number;

  @Column({ type: 'int' })
  nbr_teachers!: number;

  @Column({ type: 'int' })
  nbr_admins!: number;

  @OneToMany(() => PlanFeature, (planFeature) => planFeature.plan)
  features!: PlanFeature[];

  @OneToMany(() => Invoice, (invoice) => invoice.plan)
  invoices!: Invoice[];
}
