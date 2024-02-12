// jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategyCar008 extends PassportStrategy(Strategy, 'car008') {
  constructor(private readonly configService: ConfigService) {
    super({ 
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('JWT_SECRET'),
      signOptions: { expiresIn: configService.get<string>('TOKEN_EXPIR_TIME') ,algorithm: 'RS256'}
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub };
  }
}

@Injectable()
export class JwtStrategyMall extends PassportStrategy(Strategy, 'slave') {
  constructor(private readonly configService: ConfigService) {
    super({ 
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('JWT_SECRET'),
      signOptions: { expiresIn: configService.get<string>('TOKEN_EXPIR_TIME') ,algorithm: 'RS256'}
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub };
  }
}


// @Injectable()
// export class JwtStrategy extends PassportStrategy(Strategy) {
//   constructor(private readonly configService: ConfigService) {
//     super({
//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//       secretOrKey: configService.get<string>('JWT_SECRET'),
//       signOptions: { expiresIn: "72000s" }  // -----
//     });
//   }

//   async validate(payload: any) {
//     return { userId: payload.sub };
//   }
// }