import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class IpMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const realIp = req.headers['x-real-ip'] || req.connection.remoteAddress;
    req['realIp'] = realIp; 
    next();
  }
}
