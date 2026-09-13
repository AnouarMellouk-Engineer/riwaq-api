import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ModuleName } from './enums';
import { ClassEntity } from './class.entity';
import { User } from './user.entity';

@Entity('class_teachers')
export class ClassTeacher {
  @PrimaryColumn({ type: 'uuid' })
  class_id!: string;

  @PrimaryColumn({ type: 'uuid' })
  teacher_id!: string;

  @PrimaryColumn({ type: 'enum', enum: ModuleName })
  module!: ModuleName;

  @ManyToOne(
    () => ClassEntity,
    (classEntity) => classEntity.teacherAssignments,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'class_id' })
  class!: ClassEntity;

  @ManyToOne(() => User, (user) => user.classAssignments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'teacher_id' })
  teacher!: User;
}
