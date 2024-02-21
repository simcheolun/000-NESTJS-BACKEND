import { Module } from '@nestjs/common';
import { AuthModule } from 'src/Auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ZRedisService } from 'z-redis/z-redis.service';
import { EcountApiContoroller } from './ecount-api.controller';
import { EcountApiService } from './ecount-api.service';

@Module({
  imports: [
    AuthModule,
  ],
  controllers: [EcountApiContoroller],
  providers: [
    ZRedisService,
    EcountApiService,
  ]
})
export class EcountApiModule {}
