import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { PlatformOwnerController } from './platformOwner/platformOwner.controller';
import { PlatformOwnerService } from './platformOwner/platformOwner.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [PlatformOwnerController],
  providers: [PlatformOwnerService],
})
export class UserModule {}
