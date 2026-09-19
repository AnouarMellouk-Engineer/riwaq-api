import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow<string>('SECRET_KEY_ACCESS_TOKEN'),
    });
  }

  async validate(payload: any) {
    return {
      id: payload.sub.id,
      username: payload.username,
      role: payload.sub.role,
      schoolSlug: payload.sub.schoolSlug,
    };
  }
}
