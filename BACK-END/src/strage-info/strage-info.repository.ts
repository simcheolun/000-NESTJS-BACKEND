import { Injectable } from '@nestjs/common';
import { Brackets, DataSource, Repository } from 'typeorm';
import { storageInfoEntityMaster, storageInfoEntitySlave } from './entities/strage-info.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { returnJSONList } from 'src/Auth/custom.function';

@Injectable()
export class storageInfoRepositoryMaster extends Repository<storageInfoEntityMaster>{
    constructor(
        private dataSource: DataSource,
    ) {
        super(storageInfoEntityMaster, dataSource.createEntityManager());
    }
    async getStorageInfo() {
        return await this.find()
    }
}

@Injectable()

// export class storageInfoRepositorySlave {
//     constructor(
//         @InjectRepository(storageInfoEntitySlave)
//         private storageInfoRepository: Repository<storageInfoEntitySlave>,
//     ) { }

export class storageInfoRepositorySlave extends Repository<storageInfoEntitySlave> {
    constructor(
        private dataSource: DataSource,
    ) { super(storageInfoEntitySlave, dataSource.createEntityManager()); }

    async getStorageInfo(params: any, loginUserInfo: any) {
        const { objSearchMapper, page, size } = params
        let { searchKeyword, state } = objSearchMapper
        const take = size || 10;
        const skip = (page - 1) * take;
        const TABLENAME = 'storage_info'
        let queryBuilder = this.createQueryBuilder(TABLENAME)
            .select(TABLENAME)
            .orderBy(`${TABLENAME}.seq`, 'DESC')
        if (searchKeyword) {
            queryBuilder = queryBuilder.where(new Brackets(qb => {
                qb.where(`
                    ${TABLENAME}.name LIKE :searchKeyword
                `, { companyId: loginUserInfo.seq, searchKeyword: `%${searchKeyword}%` })
            }));
        }
        const [result, total] = await queryBuilder.skip(skip).take(take).getManyAndCount();
        return returnJSONList(result, total, page, size, 200)
        // return await this.storageInfoRepository.find();
    }
}