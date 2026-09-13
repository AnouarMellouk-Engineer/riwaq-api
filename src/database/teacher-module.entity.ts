import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ModuleName } from './enums';
import { User } from './user.entity';

@Entity('teacher_modules')
export class TeacherModule {
  @PrimaryColumn({ type: 'uuid' })
  teacher_id!: string;

  @PrimaryColumn({ type: 'enum', enum: ModuleName })
  module!: ModuleName;

  @ManyToOne(() => User, (user) => user.teacherModules, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'teacher_id' })
  teacher!: User;
}
