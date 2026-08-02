import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Put,
} from '@nestjs/common';
import { PlatformOwnerService } from './platformOwner.service';
import { ZodValidationPipe } from 'src/common/pipes/zodValidationPipe';
import updatePlatformOwnerSchema from './dto/updatePlatformOwner.dto';
import type { UpdatePlatformOwnerDto } from './dto/updatePlatformOwner.dto';

@Controller('users/platformOwners')
export class PlatformOwnerController {
  constructor(private platformOwnerService: PlatformOwnerService) {}

  @Get(':id')
  async getById(@Param('id', ParseUUIDPipe) id: string) {
    return await this.platformOwnerService.getById(id);
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(new ZodValidationPipe(updatePlatformOwnerSchema))
    updatePlatformOwnerDto: UpdatePlatformOwnerDto,
  ) {
    return await this.platformOwnerService.update(id, updatePlatformOwnerDto);
  }
}
