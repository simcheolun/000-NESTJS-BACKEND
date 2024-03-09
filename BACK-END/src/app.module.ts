import {
  CacheModule,
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD, } from '@nestjs/core';
import * as redisStore from 'cache-manager-ioredis'
import { typeOrmConfig } from './Auth/typeorm.config';

import { ZRedisModule } from 'z-redis/z-redis.module';
import { GroupUserModule } from './group-user/group-user.module';
import { SpeettoModule } from './speetto/speetto.module';
import { DevModule } from './dev/dev.module';


// bigInt 이슈
(BigInt.prototype as any).toJSON = function () {
  return this.toString();
};


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),  // 디비설정

    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => typeOrmConfig('MASTER'),
      inject: [ConfigService],
    }),
    // 다중Database연결
    TypeOrmModule.forRootAsync({
      name: 'SLAVE',
      useFactory: (configService: ConfigService) => typeOrmConfig('SLAVE'),
      inject: [ConfigService],
    }),
    
    CacheModule.register({
      store: redisStore,
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      password: process.env.REDIS_PASSWORD,
      ttl: 1 * 3600 * 1000,
      isGlobal: true,
    }),

    // 초당 요청회수
    ThrottlerModule.forRoot({
      ttl: 1,
      limit: 20,
    }),

    
    DevModule,


    // 각 모듈 주입  
    ZRedisModule,
    
    GroupUserModule,
    
    SpeettoModule,
    
    
  ],

  controllers: [AppController,],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    
  ],

})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) { 
    console.log(process.env.JWT_SECRET)
  }
}














// 지정한필드값을 sum
// result.forEach(item => {
//   const totalAmount = result.reduce((acc, curr) => acc + curr.transAmount, 0);
//   item.totalAmount = totalAmount;
// });


// 커스텀리포지토리에서 다른 리포지토리 사용
// 1번 모듈의 providers에 2번 리포지토리 주입
// 1번 리포지토리에서 2번 리포지토리주입
// constructor(
//   ...
//   private readonly orderInItemCountRepository: OrderInItemCountRepository
//   ) {
//  ...
// }
// 1번 리포지토리 함수내 사용
// const orderInItemCountResults = await this.orderInItemCountRepository.readRepository(params);
// const { totalAmount, totalAmountVat } = orderInItemCountResults.body.results


// 합산 메모
// updatedBaseInfos = filteredResult.map((baseInfo) => ({
//   ...baseInfo,
//   totalAmount,
//   totalAmountVat,
// }));