import { Module } from '@nestjs/common';
import { SchoolOwnerController } from './school-owner.controller';
import { SchoolOwnerService } from './school-owner.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/database/user.entity';
import { SchoolModule } from 'src/modules/school/school.module';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [SchoolOwnerController],
  providers: [SchoolOwnerService],
})
export class SchoolOwnerModule {}
