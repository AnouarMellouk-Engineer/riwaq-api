import { Module } from '@nestjs/common';
import { ParentController } from './parent.controller';
import { ParentService } from './parent.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/database/user.entity';
import { Student } from 'src/database/student.entity';
import { School } from 'src/database/school.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Student, School])],
  controllers: [ParentController],
  providers: [ParentService],
})
export class ParentModule {}
