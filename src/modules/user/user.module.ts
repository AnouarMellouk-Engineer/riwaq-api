import { Module } from '@nestjs/common';
import { SchoolOwnerModule } from './school-owner/school-owner.module';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/database/user.entity';
import { AdminModule } from './admin/admin.module';
import { TeacherModule } from './teacher/teacher.module';
import { ParentModule } from './parent/parent.module';

@Module({
  imports: [SchoolOwnerModule, TypeOrmModule.forFeature([User]), AdminModule, TeacherModule, ParentModule],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
