import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Role, UserStatus } from 'src/database/enums';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  public constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async verifyCredentials(username: string, password: string) {
    const user = await this.userService.getByUserName(username);

    if (user.status !== UserStatus.ACTIVE) {
      throw new UnauthorizedException('the account not active for now ');
    }
    const isCorrect = await bcrypt.compare(password, user.password);

    if (!isCorrect) {
      throw new UnauthorizedException('username or password is uncorrect');
    }
    return {
      id: user.id,
      email: user.email,
      username: user.username,
      role: user.role,
    };
  }

  async login(user: {
    id: string;
    email: string;
    username: string;
    role: Role;
  }) {
    const payload = {
      sub: { id: user.id, email: user.email, role: user.role },
      username: user.username,
    };

    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('SECRET_KEY_ACCESS_TOKEN'),
      expiresIn: '15m',
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('SECRET_KEY_REFRESH_TOKEN'),
      expiresIn: '7d',
    });

    await this.userService.addRefreshToken(user.id, refreshToken);

    return { accessToken, refreshToken };
  }

  async logout(userId: string) {
    // Clear the stored refresh token — makes it unusable even if leaked
    await this.userService.clearRefreshToken(userId);
    return { message: 'Logged out successfully' };
  }

  async refresh(
    payload: {
      sub: {
        id: string;
        email: string;
        role: Role;
      };
      username: string;
    },
    refrshToken: string,
  ) {
    const isCorrect = await this.userService.validateRefreshToken(
      payload.sub.id,
      refrshToken,
    );
    if (!isCorrect) {
      throw new UnauthorizedException();
    }

    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('SECRET_KEY_ACCESS_TOKEN'),
      expiresIn: '15m',
    });

    return { accessToken, refrshToken };
  }
}
