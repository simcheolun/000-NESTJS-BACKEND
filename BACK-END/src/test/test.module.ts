import { Module } from '@nestjs/common';
import { TestService } from './test.service';
import { TestController } from './test.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { testMasterEntity, testSlaveEntity } from './entities/test.entity';
import { testMasterRepository, testSlaveRepository } from './test.repository';

@Module({
  imports: [

    TypeOrmModule.forFeature([testMasterEntity]),
    // TypeOrmModule.forRoot({
    //   type: 'mysql',
    //   name: "SALVE",
    //   host: "115.95.188.130",
    //   port: 3306,
    //   username: "root",
    //   password: "car008mysqlpasswd@!@",
    //   database: 'car008',
    //   entities: [testSlaveEntity],
    // }),
    TypeOrmModule.forFeature([testSlaveEntity],'SLAVE')
  ],
  controllers: [TestController],
  providers: [TestService, testMasterRepository, testSlaveRepository],
  exports: [TestService]
})
export class TestModule {
  constructor() { }
}
