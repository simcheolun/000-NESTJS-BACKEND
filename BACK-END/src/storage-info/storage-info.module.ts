import { Module } from '@nestjs/common';
import { StorageInfoController } from './storage-info.controller';
import { StorageInfoService } from './storage-info.service';
import { StorageInfoEntityMaster, StorageInfoEntitySlave } from './entities/storage-info.entity';
import { AuthModule } from 'src/Auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StorageInfoRepository } from './storage-info.repository';
import { ZRedisService } from 'z-redis/z-redis.service';
import { AccountInfoRepositorySlave } from 'src/account-info/account-info.repository';
import { AccountInfoEntitySlave } from 'src/account-info/entities/account-info.entity';
@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([StorageInfoEntityMaster]),
    TypeOrmModule.forFeature([StorageInfoEntitySlave],'SLAVE'),
    TypeOrmModule.forFeature([AccountInfoEntitySlave],'SLAVE'),
  ],
  controllers: [StorageInfoController],
  providers: [
    StorageInfoService,
    StorageInfoRepository,
    ZRedisService,

    AccountInfoRepositorySlave
  ]
})
export class StorageInfoModule { }
