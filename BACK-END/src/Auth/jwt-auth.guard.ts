import { ExecutionContext, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext){
    console.log('짝!짝!짝!')
    return true
   }
  // canActivate(context: ExecutionContext) {
  //   const request = context.switchToHttp().getRequest();
  //   const isValidToken = this.validateToken(request.headers.jwtauthorization); // 토큰 검증 메서드

  //   if (!isValidToken && request.headers.jwtauthorization) {
  //     const unauthorizedError = {
  //       code: 201,
  //       statusCode: 'OK',
  //       message: '유효하지 않은 토큰입니다.',
  //     };
  //     throw new UnauthorizedException(
  //       { data: { unauthorizedError} ,statusCode: 201},
  //       'Unauthorized'
  //     );
  //   }
  //   return true;
  // }

}

