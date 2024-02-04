// import {
//   CacheModule,
//   MiddlewareConsumer,
//   Module,
//   NestModule,
//   RequestMethod,
// } from '@nestjs/common';

// import { ConfigModule, ConfigService } from '@nestjs/config';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
// import { TypeOrmConfigService } from './Auth/config/typeorm.config.service';
// import { JwtConfigService } from './Auth/config/jwt.config.service';
// import { JwtModule } from '@nestjs/jwt';
// import { AuthMiddleware } from './Auth/auth.middleware';
// import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
// import { APP_GUARD, } from '@nestjs/core';

// import { AccountInfoModule } from './account-info/account-info.module';
// import { SalesProductInfoModule } from './sales-product-info/sales-product-info.module';
// import { CustomerInfoModule } from './customer-info/customer-info.module';
// import { OrderInInfoModule } from './order-in-info/order-in-info.module';
// import { OrderInItemInfoModule } from './order-in-item-info/order-in-item-info.module';
// import { OrderOutInfoModule } from './order-out-info/order-out-info.module';
// import { OrderOutItemInfoModule } from './order-out-item-info/order-out-item-info.module';
// import { BaseInfoModule } from './base-info/base-info.module';
// import { BizMainModule } from './biz-main/biz-main.module';
// import { CompanyInfoModule } from './company-info/company-info.module';
// import { EcountSessionExModule } from './ecount-session-ex/ecount-session-ex.module';
// import { BaseItemExModule } from './base-item-ex/base-item-ex.module';
// import { StorageInfoModule } from './storage-info/storage-info.module';
// import { EcountListModule } from './ecount-list-ex/ecount-list-ex.module';
// import { MallMemberModule } from './mall-member/mall-member.module';
// import { MallCompanyModule } from './mall-company/mall-company.module';
// import { MallPointAccountModule } from './mall-point-account/mall-point-account.module';
// import { MallConfigModule } from './mall-config/mall-config.module';
// import { MallBoardModule } from './mall-board-info/mall-board-info.module';
// import { MallOrderModule } from './mall-order/mall-order.module';
// import { MallOrderProductModule } from './mall-order-product/mall-order-product.module';

// import { TypeOrmConfigModule } from './Auth/config/typeorm.config.module';
// import { TypeOrmMallConfigService } from './Auth/config/typeormMall.config.service';
// import { TypeOrmMallConfigModule } from './Auth/config/typeormMall.config.module';
// import { MallComapnyLicenseModule } from './mall-company-license/mall-company-license.module';

// // bigInt 이슈
// (BigInt.prototype as any).toJSON = function () {
//   return this.toString();
// };


// @Module({
//   imports: [
//     ConfigModule.forRoot({ isGlobal: true }),  // 디비설정

//     TypeOrmModule.forRootAsync({ // 전산DB
//       imports:[TypeOrmConfigModule],
//       useClass: TypeOrmConfigService,
//       inject: [ConfigService],
//     }),

//     TypeOrmModule.forRootAsync({ // 전산DB
//       name: 'mall',
//       imports:[TypeOrmMallConfigModule],
//       useClass: TypeOrmMallConfigService,
//       inject: [ConfigService],
//     }),


//     JwtModule.registerAsync({
//       imports: [ConfigModule],
//       useClass: JwtConfigService,
//       inject: [ConfigService]
//     }),

//     CacheModule.register({
//       ttl: 600000,  // 데이터 캐싱 시간
//       max: 100, //최대 캐싱 개수
//       isGlobal: true,
//     }),
    
//     // 요청회수제한
//     ThrottlerModule.forRoot({
//       ttl: 1, // 1초 에 
//       limit: 3, // 2번요청
//     }),

//     // 각 모듈 주입  
//     BaseInfoModule,

//     AccountInfoModule,
//     SalesProductInfoModule,
//     BaseItemExModule, // 재고관리
//     CustomerInfoModule,
//     OrderInInfoModule,
//     OrderInItemInfoModule,
//     EcountListModule,
//     OrderOutInfoModule,
//     OrderOutItemInfoModule,
//     BizMainModule,
//     CompanyInfoModule,
//     EcountSessionExModule,
//     StorageInfoModule,
    

//     MallMemberModule,
//     MallCompanyModule,
//     MallPointAccountModule,
//     MallBoardModule,
//     MallConfigModule,
//     MallOrderModule,
//     MallOrderProductModule,
//     MallComapnyLicenseModule,
    

//   ],


//   controllers: [AppController,],
//   providers: [AppService, AuthMiddleware, 
//     {
//     provide: APP_GUARD,
//     useClass: ThrottlerGuard,
//     },],

// })
// export class AppModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {

//     // 로그인시 토큰검증 제외
//     consumer
//     .apply(AuthMiddleware)
//     .exclude(
//       { path: '/api/LoginByInventory', method: RequestMethod.POST },
//       { path: '/api/joinUs', method: RequestMethod.POST },

//     )
//     .forRoutes('*');

//     // 모든 라우터에  토큰검증 사용안함
//     // consumer.apply(AuthMiddleware).forRoutes('*');
//   }
// }














// // 지정한필드값을 sum
// // result.forEach(item => {
// //   const totalAmount = result.reduce((acc, curr) => acc + curr.transAmount, 0);
// //   item.totalAmount = totalAmount;
// // });


// // 커스텀리포지토리에서 다른 리포지토리 사용
// // 1번 모듈의 providers에 2번 리포지토리 주입
// // 1번 리포지토리에서 2번 리포지토리주입
// // constructor(
// //   ...
// //   private readonly orderInItemCountRepository: OrderInItemCountRepository
// //   ) {
// //  ...
// // }
// // 1번 리포지토리 함수내 사용
// // const orderInItemCountResults = await this.orderInItemCountRepository.readRepository(params);
// // const { totalAmount, totalAmountVat } = orderInItemCountResults.body.results


// // 합산 메모
// // updatedBaseInfos = filteredResult.map((baseInfo) => ({
// //   ...baseInfo,
// //   totalAmount,
// //   totalAmountVat,
// // }));