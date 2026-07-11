import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { School } from './entities/school.entity';
import { Notification } from './entities/notification.entity';
import { Student } from './entities/studentProfile.entity';
import { Teacher } from './entities/teacherProfile.entity';
import { Class } from './entities/class.entity';
import { ClassField } from './entities/classField.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'anouar',
      password: '',
      database: 'riwaq',
      entities: [
        User,
        School,
        Notification,
        Student,
        Teacher,
        Class,
        ClassField,
      ],
      //  autoLoadEntities: true,
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
