import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { School } from './school.entity';

@Entity()
export class Plan {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  name!: string;

  @Column('float')
  price!: number;

  @OneToMany(() => School, (school) => school.plan)
  schools!: School[];
}
