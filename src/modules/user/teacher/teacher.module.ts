import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeacherService } from './teacher.service';
import { TeacherController } from './teacher.controller';
import { User } from 'src/database/user.entity';
import { School } from 'src/database/school.entity';
import { TeacherModule as TeacherModuleEntity } from 'src/database/teacher-module.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, School, TeacherModuleEntity])],
  providers: [TeacherService],
  controllers: [TeacherController],
})
export class TeacherModule {}
