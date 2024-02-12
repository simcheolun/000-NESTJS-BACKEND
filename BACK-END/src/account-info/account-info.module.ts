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
    TypeOrmModule.forFeature([AccountInfoRepositorySlave]), //AccountInfoEntitySlave
  ],
  controllers: [AccountInfoController],
  providers: [
    AccountInfoService,
    AccountInfoRepositorySlave,
    AccountInfoRepositoryMaster,
    ZRedisService,
  ],
  exports:[AccountInfoRepositorySlave,
    AccountInfoRepositoryMaster,]
})
export class AccountInfoModule {
  constructor(){
    // const master :any =(TypeOrmModule.forFeature([AccountInfoEntityMaster]))
    // console.log(master.providers[0])
    // const slave :any =(TypeOrmModule.forFeature([AccountInfoEntitySlave]))
    // console.log(slave.providers[0])
  }
}
