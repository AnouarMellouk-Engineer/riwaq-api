import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Role, User } from '../user.entity';
import { Repository } from 'typeorm';
import type { UpdatePlatformOwnerDto } from './dto/updatePlatformOwner.dto';

@Injectable()
export class PlatformOwnerService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async getById(id: string) {
    const user = await this.userRepo.findOne({
      where: {
        id,
        role: Role.PLATFORM_ADMIN,
      },
      select: {
        firstName: true,
        lastName: true,
        email: true,
        avatarUrl: true,
        role: true,
      },
    });

    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  async update(id: string, updatePlatformOwnerDto: UpdatePlatformOwnerDto) {
    const platformOwner = await this.userRepo.existsBy({
      id,
      role: Role.PLATFORM_ADMIN,
    });

    if (!platformOwner) {
      throw new NotFoundException();
    }
    return await this.userRepo.update(id, updatePlatformOwnerDto);
  }
}
