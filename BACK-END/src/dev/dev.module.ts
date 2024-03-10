// create Modules
import { Module } from '@nestjs/common';
import { DevService } from './dev.service';
import { DevController } from './dev.controller';
import { AuthModule } from 'src/Auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DevRepository } from './dev.repository';
import { ZRedisService } from 'z-redis/z-redis.service';
import { salesProductInfoEntity } from 'src/group-user/entities/sales-product-info.entity';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([salesProductInfoEntity]),
  ],
  controllers: [DevController],
  providers: [
    ZRedisService,
    DevService,
    DevRepository,
  ]
})
export class DevModule { }