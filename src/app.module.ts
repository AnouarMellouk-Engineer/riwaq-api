import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { School } from './entities/school.entity';
import { Class } from './entities/class.entity';
import { Plan } from './entities/plan.entity';
import { Student } from './entities/student.entity';
import { User } from './entities/user.entity';
import { SchoolModule } from './school/school.module';
import { PlanModule } from './plan/plan.module';
import { UserModule } from './users/user.module';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
