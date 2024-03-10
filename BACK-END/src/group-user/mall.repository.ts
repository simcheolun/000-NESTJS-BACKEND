import { Injectable } from '@nestjs/common';
import { Brackets, DataSource, Repository } from 'typeorm';
import {
    getpaginatedData,
    getData,
    returnMessage,
} from 'src/Auth/custom.function';
import { salesProductInfoEntity } from './entities/sales-product-info.entity';
@Injectable()
export class groupUserRepository extends Repository<salesProductInfoEntity>{
    constructor(
        private dataSource: DataSource,
    ) {
        super(salesProductInfoEntity, dataSource.createEntityManager());
    }
    async getgroupUserRepository(params: any, loginUserInfo: any) {
        const { size, page, searchKeyword } = params
        const TABLENAME = 'sales_product_info'
        let queryBuilder = this.createQueryBuilder(TABLENAME)
            .select(TABLENAME)
            .orderBy(TABLENAME, 'ASC')
        const data = await queryBuilder.getMany()
        const result = await getpaginatedData(data, page, size, ['deleteAt'])
        return result
    }
}