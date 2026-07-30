import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { School } from './school.entity';
import { User } from './user.entity';
import { Class } from './class.entity';

@Entity()
export class Student {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column({ type: 'date' })
  dateOfBirth!: Date;

  @ManyToOne(() => School)
  school!: School;

  @ManyToOne(() => User)
  parent!: User;

  @ManyToOne(() => Class)
  class!: Class;
}
