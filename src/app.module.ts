import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { School } from './school/school.entity';
import { Class } from './school/class.entity';
import { Plan } from './plan/plan.entity';
import { Student } from './school/student.entity';
import { User } from './user/user.entity';
import { SchoolModule } from './school/school.module';
import { PlanModule } from './plan/plan.module';
import { UserModule } from './user/user.module';
import { StudentModule } from './student/student.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'anouar',
      password: '',
      database: 'riwaq',
      entities: [School, Class, Plan, Student, User],
      synchronize: true,
    }),
    SchoolModule,
    PlanModule,
    UserModule,
    StudentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
