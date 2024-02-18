// auth.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) { }

  async createToken(userId: number): Promise<string> {
    const payload = { sub: userId };
    return this.jwtService.sign(payload,{ secret: process.env.JWT_SECRET });
  }

  async logoutToken(jwt: any, user: any): Promise<string> {
    const token = jwt.sign({ sub: user }, process.env.JWT_SECRET, { expiresIn: '1s' });
    return token;
  }
}