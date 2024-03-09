import { Module } from '@nestjs/common';
import { AuthModule } from 'src/Auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ZRedisService } from 'z-redis/z-redis.service';
import { DevController } from './dev.controller';
import { DevService } from './dev.service';

@Module({
  imports: [
    AuthModule,
  ],
  controllers: [DevController],
  providers: [
    ZRedisService,
    DevService,
  ]
})
export class DevModule {}
