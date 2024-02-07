import { Module } from '@nestjs/common';
import { StorageInfoController } from './storage-info.controller';
import { StorageInfoService } from './storage-info.service';
import { StorageInfoEntityMaster, StorageInfoEntitySlave } from './entities/storage-info.entity';
import { AuthModule } from 'src/Auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StorageInfoRepository } from './storage-info.repository';
import { ZRedisService } from 'z-redis/z-redis.service';
@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([StorageInfoEntityMaster],'MASTER'),
    TypeOrmModule.forFeature([StorageInfoEntitySlave],'SLAVE'),
  ],
  controllers: [StorageInfoController],
  providers: [
    StorageInfoService,
    StorageInfoRepository,
    ZRedisService,
  ]
})
export class StorageInfoModule { }
