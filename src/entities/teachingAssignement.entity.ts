import { Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Teacher } from './teacherProfile.entity';
import { Class } from './class.entity';
import { Assignments } from './assignments.entity';

@Entity()
export class TeachingAssignement {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Teacher, (teacher) => teacher.classes)
  teacher!: Teacher;

  @ManyToOne(() => Class, (c) => c.teachers)
  classs!: Class;

  @OneToMany(() => Assignments, (ass) => ass.teachingAssignenment)
  assignments!: Assignments[];
}
