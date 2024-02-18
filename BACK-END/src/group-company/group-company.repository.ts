import { Injectable } from '@nestjs/common';
import { Brackets, DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { returnJSONList } from 'src/Auth/custom.function';
import { GroupCompanyEntity, GroupCompanyEntitySlave } from './entities/group-company.entity';

@Injectable()
export class GroupCompanyRepository extends Repository<GroupCompanyEntity>{
    constructor(
        private dataSource: DataSource,
    ) {
        super(GroupCompanyEntity, dataSource.createEntityManager());
    }
    async getCompanyInfo() {
        const TABLENAME = 'group_company'
        let queryBuilder = this.createQueryBuilder(TABLENAME)
            .select(TABLENAME)
            .orderBy(`${TABLENAME}.seq`, 'ASC')
        const result = await queryBuilder.getManyAndCount();
        return result
    }
}

@Injectable()
export class GroupCompanyRepositorySlave extends Repository<GroupCompanyEntitySlave> {
    constructor(
        private dataSource: DataSource,
    ) { super(GroupCompanyEntitySlave, dataSource.createEntityManager()); }
}