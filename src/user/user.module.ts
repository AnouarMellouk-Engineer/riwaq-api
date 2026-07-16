import { Module } from '@nestjs/common';
import { AdminController } from './admin/admin.controller';
import { TeacherController } from './treacher/teacher.controller';
import { StudentController } from './student/student.controller';
import { AdminService } from './admin/admin.service';
import { TeacherService } from './treacher/teacher.service';
import { StudentService } from './student/student.service';

@Module({
  providers: [AdminService, TeacherService, StudentService],
  controllers: [AdminController, TeacherController, StudentController],
  imports: [],
})
export class UserModule {}
