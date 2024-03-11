import { Injectable } from '@nestjs/common';
import { Brackets, DataSource, Repository } from 'typeorm';
import {
    getpaginatedData,
    getData,
    returnMessage,
} from 'src/Auth/custom.function';
import { CompanyInfoEntity, StorageInfoEntity, salesProductInfoEntity } from './entities/sales-product-info.entity';
@Injectable()
export class salesProducInfotRepository extends Repository<salesProductInfoEntity>{
    constructor(
        private dataSource: DataSource,
    ) {
        super(salesProductInfoEntity, dataSource.createEntityManager());
    }
    async getSalesProductInfo(params: any, loginUserInfo: any) {
        const { size, page, searchKeyword } = params
        const TABLENAME = 'sales_product_info'
        let queryBuilder = this.createQueryBuilder(TABLENAME)
            .select(TABLENAME)
            .orderBy(`${TABLENAME}.seq`, 'ASC')
        const data = await queryBuilder.getMany()
        const result = await getpaginatedData(data, page, size, ['deleteAt'])
        return result
    }
}

@Injectable()
export class CompanyInfoRepository extends Repository<CompanyInfoEntity>{
    constructor(
        private dataSource: DataSource,
    ) {
        super(CompanyInfoEntity, dataSource.createEntityManager());
    }
    async getCompanyInfo(params: any, loginUserInfo: any) {
        const { size, page, searchKeyword } = params
        const TABLENAME = 'company_info'
        let queryBuilder = this.createQueryBuilder(TABLENAME)
            .select(TABLENAME)
            .orderBy(`${TABLENAME}.seq`, 'ASC')
        const data = await queryBuilder.getMany()
        const result = await getpaginatedData(data, page, size, ['deleteAt'])
        return result
    }
}

@Injectable()
export class StorageInfoRepository extends Repository<StorageInfoEntity>{
    constructor(
        private dataSource: DataSource,
    ) {
        super(StorageInfoEntity, dataSource.createEntityManager());
    }
    async getStorageInfo(params: any, loginUserInfo: any) {
        const { size, page, searchKeyword } = params
        const TABLENAME = 'storage_info'
        let queryBuilder = this.createQueryBuilder(TABLENAME)
            .select(TABLENAME)
            .orderBy(`${TABLENAME}.seq`, 'ASC')
        const data = await queryBuilder.getMany()
        const result = await getpaginatedData(data, page, size, ['deleteAt'])
        return result
    }
}