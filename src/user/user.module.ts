import { Module } from '@nestjs/common';
import { PlatformOwnerController } from './platformOwner/platformOwner.controller';
import { PlatformOwnerService } from './platformOwner/platformOwner.service';
import { PlatformOwnerModule } from './platformOwner/platformOwner.module';
import { SchoolOwnerController } from './schoolOwner/schoolOwner.controller';
import { SchoolOwnerService } from './schoolOwner/schoolOwner.service';
import { SchoolOwnerModule } from './schoolOwner/schoolOwner.module';

@Module({
  imports: [PlatformOwnerModule, SchoolOwnerModule],
  controllers: [],
  providers: [],
})
export class UserModule {}
