import { Module } from '@nestjs/common';
import { SchoolOwnerController } from './schoolOwner.controller';
import { SchoolOwnerService } from './schoolOwner.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { SchoolModule } from 'src/school/school.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), SchoolModule],
  controllers: [SchoolOwnerController],
  providers: [SchoolOwnerService],
})
export class SchoolOwnerModule {}
