import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { User } from 'src/database/user.entity';
import { School } from 'src/database/school.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, School])],
  providers: [AdminService],
  controllers: [AdminController],
})
export class AdminModule {}
