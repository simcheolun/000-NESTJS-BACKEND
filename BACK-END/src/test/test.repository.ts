import { Injectable } from '@nestjs/common';
import { Brackets, DataSource, Repository } from 'typeorm';
import { returnJSONList, returnJSONSingle } from 'src/Auth/custom.function';
import { testMasterEntity, testSlaveEntity } from './entities/test.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class testMasterRepository extends Repository<testMasterEntity>{
    constructor(
        // @InjectRepository(testMasterEntity, 'MASTER') private readonly testMasterRepository: testMasterRepository,
        private dataSource: DataSource,
    ) {
        super(testMasterEntity, dataSource.createEntityManager());
    }
    async getTestInfo() {
        const TABLENAME = 'ACCOUNT_INFO'
        let queryBuilder = this.createQueryBuilder(TABLENAME)
            .select(TABLENAME)
        const result = await queryBuilder.getOne();
        console.log(result)
        return result
    }
}

@Injectable()
export class testSlaveRepository extends Repository<testSlaveEntity>{
    constructor(
        @InjectRepository(testSlaveEntity,'SLAVE') 
        private readonly testSlaveRepository:  Repository<testSlaveEntity>,
        private dataSource: DataSource,
    ) {
        super(testSlaveEntity, dataSource.createEntityManager());
    }

    async getTestInfo() {
        const TABLENAME = 'ACCOUNT_INFO'
        let queryBuilder = this.createQueryBuilder(TABLENAME)
            .select(TABLENAME)
        const result = await queryBuilder.getOne();
        console.log(result)
        return result
    }

}



