import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassService } from './class.service';
import { ClassController } from './class.controller';
import { ClassEntity } from 'src/database/class.entity';
import { Student } from 'src/database/student.entity';
import { ClassTeacher } from 'src/database/class-teacher.entity';
import { School } from 'src/database/school.entity';
import { User } from 'src/database/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ClassEntity,
      Student,
      ClassTeacher,
      School,
      User,
    ]),
  ],
  providers: [ClassService],
  controllers: [ClassController],
})
export class ClassModule {}
