import { Module } from '@nestjs/common';
import { PlatformOwnerController } from './platformOwner/platformOwner.controller';
import { PlatformOwnerService } from './platformOwner/platformOwner.service';
import { PlatformOwnerModule } from './platformOwner/platformOwner.module';

@Module({
  imports: [PlatformOwnerModule],
  controllers: [PlatformOwnerController],
  providers: [PlatformOwnerService],
})
export class UserModule {}
