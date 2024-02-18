import { Injectable } from '@nestjs/common';
import { Brackets, DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { returnJSONList } from 'src/Auth/custom.function';
import { GroupUserEntity, GroupUserEntitySlave } from './entities/group-user.entity';

@Injectable()
export class GroupUserRepository extends Repository<GroupUserEntity>{
    constructor(
        private dataSource: DataSource,
    ) {
        super(GroupUserEntity, dataSource.createEntityManager());
    }
    async getUserInfo() {
        const TABLENAME = 'group_user'
        let queryBuilder = this.createQueryBuilder(TABLENAME)
            .select(TABLENAME)
            .orderBy(`${TABLENAME}.seq`, 'ASC')
        const result = await queryBuilder.getManyAndCount();
        return result
    }
}

@Injectable()
export class GroupUserRepositorySlave extends Repository<GroupUserEntitySlave> {
    constructor(
        private dataSource: DataSource,
    ) { super(GroupUserEntitySlave, dataSource.createEntityManager()); }
}
