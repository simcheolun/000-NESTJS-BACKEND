import { Module } from '@nestjs/common';
import { AuthModule } from 'src/Auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ZRedisService } from 'z-redis/z-redis.service';
import { AccountInfoEntityMaster, AccountInfoEntitySlave } from './entities/account-info.entity';
import { AccountInfoController } from './account-info.controller';
import { AccountInfoService } from './account-info.service';
import { AccountInfoRepositoryMaster, AccountInfoRepositorySlave } from './account-info.repository';
@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([AccountInfoEntityMaster]),
    TypeOrmModule.forFeature([AccountInfoEntitySlave],'SLAVE'),
  ],
  controllers: [AccountInfoController],
  providers: [
    AccountInfoService,
    AccountInfoRepositorySlave,
    AccountInfoRepositoryMaster,
    ZRedisService,
  ]
})
export class AccountInfoModule {}
