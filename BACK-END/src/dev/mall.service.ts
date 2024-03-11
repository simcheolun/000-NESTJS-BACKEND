import { Injectable } from '@nestjs/common';
import { CreateDevDto } from './dto/create-dev.dto';
import { UpdateDevDto } from './dto/update-dev.dto';
import { ZRedisService } from 'z-redis/z-redis.service';
import { fieldToSimple, firstToUpper, stringToSimple, stringToSimple_ } from 'src/Auth/custom.function';
import { CompanyInfoRepository, StorageInfoRepository, salesProducInfotRepository } from 'src/group-user/mall.repository';
import { In } from 'typeorm';

@Injectable()
export class MallService {
    constructor(
        private readonly salesProducInfotRepository: salesProducInfotRepository,
        private readonly CompanyInfoRepository: CompanyInfoRepository,
        private readonly StorageInfoRepository: StorageInfoRepository,
    ) { }
    async getSalesProductInfo() {
        const params = {
            size: 20,
            page: 1,
            searchKeyword: null,
        }
        // 메인 정보 배열
        const products: any = await this.salesProducInfotRepository
            .getSalesProductInfo(params, null)
        const subFields = ['companySeq', 'storageSeq']
        const subFieldsValue = subFields.map(field => {
            return products.body.results.map((product: any) => product[field]);
        });
        // 서브 정보 배열
        const companyInfos = await this.CompanyInfoRepository.find({
            where: { companySeq: In(subFieldsValue[0]) }
        })
        const storageInfos = await this.StorageInfoRepository.find({
            where: { seq: In(subFieldsValue[1]) }
        })
        // 메인에 서브정보 삽입
        products.body.results.map((product: any) => {
            product.companyInfo= companyInfos.find((item: any) => item['companySeq'] == product[subFields[0]])
            product.storageInfo= storageInfos.find((item: any) => {
                return item['seq'] == product[subFields[1]]})
        })


        return products
    }
}