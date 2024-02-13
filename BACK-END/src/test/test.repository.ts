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
}

@Injectable()
export class testSlaveRepository extends Repository<testSlaveEntity>{
    constructor(
        // @InjectRepository(testSlaveEntity, 'SLAVE') private readonly testSlaveRepository: testSlaveRepository,
        private dataSource: DataSource,
        ) {
        super(testSlaveEntity, dataSource.createEntityManager());
    }

    // async getTestSlaveInfo(params: any, loginUserInfo: any) {
    //     const { objSearchMapper, page, size } = params
    //     let { searchKeyword, state } = objSearchMapper
    //     const take = size || 10;
    //     const skip = (page - 1) * take;
    //     const TABLENAME = 'accountInfo'
    //     let queryBuilder = this.createQueryBuilder(TABLENAME)
    //         .select(TABLENAME)
    //         // .where(`${TABLENAME}.companyId = :companyId`, { companyId: loginUserInfo.companyId })
    //         .orderBy(`${TABLENAME}.seq`, 'DESC')
    //     if (searchKeyword) {
    //         queryBuilder = queryBuilder.where(new Brackets(qb => {
    //             qb.where(`
    //             ${TABLENAME}.name LIKE :searchKeyword
    //         `, { companyId: loginUserInfo.seq, searchKeyword: `%${searchKeyword}%` })
    //         }));
    //     }
    //     if (state != null || state != undefined) {
    //         queryBuilder = queryBuilder.andWhere(`${TABLENAME}.state = :state`, { state: state });
    //     }
    //     const [result, total] = await queryBuilder.skip(skip).take(take).getManyAndCount();
    //     return returnJSONList(result, total, page, size, 200)
    // }

}
