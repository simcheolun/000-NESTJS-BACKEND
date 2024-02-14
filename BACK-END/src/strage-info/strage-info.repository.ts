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
        const TABLENAME = 'storage_info'
        let queryBuilder = this.createQueryBuilder(TABLENAME)
            .select(TABLENAME)
            .orderBy(`${TABLENAME}.seq`, 'ASC')
        const result = await queryBuilder.getOne();
        return result
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
               const TABLENAME = 'storage_info'
        let queryBuilder = this.createQueryBuilder(TABLENAME)
            .select(TABLENAME)
            .orderBy(`${TABLENAME}.seq`, 'ASC')
               const result = await queryBuilder.getOne();
        return result
    }
}