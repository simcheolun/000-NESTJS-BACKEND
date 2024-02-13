import { Module } from '@nestjs/common';
import { TestService } from './test.service';
import { TestController } from './test.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { testMasterEntity, testSlaveEntity } from './entities/test.entity';
import { testMasterRepository, testSlaveRepository } from './test.repository';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      username:'root',
      password: 'car008mysqlpasswd@!@',
        host:'127.0.0.1',
        name: 'MATER',
        type: 'mysql',
        port: 3306,
        entities: [testMasterEntity],
        synchronize: false,
        extra: {
            connectionLimit: 10,
        },
    }),
    TypeOrmModule.forRoot({
        username:'root',
        password:'car008mysqlpasswd@!@',
        host:'192.168.0.6',
        name: 'SLAVE',
        type: 'mysql',
        port: 3307,
        entities: [testSlaveEntity],
        synchronize: false,
        extra: {
            connectionLimit: 10,
        },
    }),
],
  controllers: [TestController],
  providers: [TestService,testMasterRepository,testSlaveRepository],
  exports:[TestService]
})
export class TestModule {
  constructor() {
    const dddd: any = TypeOrmModule.forRoot({
      username:'root',
      password:'car008mysqlpasswd@!@',
      host:'192.168.0.6',
      name: 'SLAVE',
      type: 'mysql',
      port: 3307,
      entities: [testSlaveEntity],
      synchronize: false,
      extra: {
          connectionLimit: 10,
      },
  })
    console.log(dddd.imports[0].providers)
   }
}
