import { Module } from '@nestjs/common';
import { SchoolOwnerModule } from './school-owner/school-owner.module';

@Module({
  imports: [SchoolOwnerModule]
})
export class UserModule {}
