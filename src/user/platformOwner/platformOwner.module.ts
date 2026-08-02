import { Module } from '@nestjs/common';
import { PlatformOwnerController } from './platformOwner.controller';
import { PlatformOwnerService } from './platformOwner.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [PlatformOwnerController],
  providers: [PlatformOwnerService],
})
export class PlatformOwnerModule {}
