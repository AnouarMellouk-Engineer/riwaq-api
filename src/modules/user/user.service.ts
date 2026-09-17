import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/database/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  public constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  async getByUserName(username: string) {
    const user = await this.userRepo.findOne({
      where: { username },
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        password: true,
        status: true,
      },
    });

    if (!user) {
      throw new NotFoundException(`${username} does not found`);
    }
    return user;
  }

  async addRefreshToken(id: string, refreshToken: string) {
    const refreshTokenHash = await bcrypt.hash(refreshToken, 10);

    const result = await this.userRepo.update({ id }, { refreshTokenHash });

    if (result.affected === 0) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
  }

  async clearRefreshToken(id: string) {
    await this.userRepo.update({ id }, { refreshTokenHash: null });
  }

  async validateRefreshToken(
    id: string,
    refreshToken: string,
  ): Promise<boolean> {
    const user = await this.userRepo.findOneBy({ id });

    if (!user || !user.refreshTokenHash) {
      return false;
    }

    return bcrypt.compare(refreshToken, user.refreshTokenHash);
  }
}
