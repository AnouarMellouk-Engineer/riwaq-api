import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { Student } from 'src/database/student.entity';
import { School } from 'src/database/school.entity';
import { User } from 'src/database/user.entity';
import { ClassEntity } from 'src/database/class.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Student, School, User, ClassEntity])],
  controllers: [StudentController],
  providers: [StudentService],
})
export class StudentModule {}
