import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { FeatureName } from './enums';
import { Plan } from './plan.entity';

@Entity('plan_features')
export class PlanFeature {
  @PrimaryColumn({ type: 'uuid' })
  plan_id!: string;

  @PrimaryColumn({ type: 'enum', enum: FeatureName })
  feature!: FeatureName;

  @ManyToOne(() => Plan, (plan) => plan.features, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'plan_id' })
  plan!: Plan;
}
