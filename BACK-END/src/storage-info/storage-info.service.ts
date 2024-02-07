import _ from 'lodash'
import { Inject, Injectable } from '@nestjs/common';
import chalk from 'chalk';
import { searchParams } from './search.params';
import { StorageInfoRepository } from './storage-info.repository';
import { ZRedisService } from 'z-redis/z-redis.service';
import { createSN, returnJSONSingle } from 'src/Auth/custom.function';
import { AccountInfoRepositorySlave } from 'src/account-info/account-info.repository';

@Injectable()
export class StorageInfoService {
  cacheName = 'StorageInfoService'

  constructor(
    private StorageInfoRepository: StorageInfoRepository,
    private AccountInfoRepositorySlave:AccountInfoRepositorySlave,
    private ZRedisService: ZRedisService,
  ) { }
  // #-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-# READ
  async getStorageInfo(params: searchParams, loginUserInfo: any) {
    return this.AccountInfoRepositorySlave.find()
    return await this.StorageInfoRepository.getStorageInfo(params, loginUserInfo);
  }
  // CREATE #-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#
  async setStorageInfo(info: any, loginUserInfo: any) {

    // 기본 반환갑 초기화
    let code = 201
    let statusCode = 'OK'
    let message = '요청이 반영되었습니다.'
    let result: any
    // 창고이름 중복
    if (!info.seq && (!info.name)) { // 새로운 등록 시 필수항목
      code = 404
      statusCode = 'CANCEL'
      message = '창고이름이 필요합니다.'
      return info
    }
    await this.ZRedisService.delCaching('storageInfo')
    await this.StorageInfoRepository.update({ companyId: loginUserInfo.companyId }, { bizUsage: 1 })
    if (info.seq) { // UPDATE
      code = 201
      statusCode = 'UPDATE OK'
      result = await this.StorageInfoRepository.update(
        { seq: info.seq },
        {
          updater: BigInt(loginUserInfo.seq),
          addr: info.addr,
          memo: info.memo,
          bizUsage: info.bizUsage,
          state: info.state,
        }
      );
    } else { // INSERT
      const ExistInfo = await this.StorageInfoRepository.findOne({ where: { name: info.name, companyId: loginUserInfo.companyId } })
      if (ExistInfo) {
        code = 702
        statusCode = 'CANCEL'
        message = '창고가 존재합니다.'
        return returnJSONSingle(info, message, statusCode, 200)
      }
      if (info.bizUsage == 0) {
        await this.StorageInfoRepository.update({ companyId: loginUserInfo.companyId }, { bizUsage: 1 })
      }
      code = 201
      statusCode = 'OK'
      const resultMallCompanyInfo = await this.StorageInfoRepository.insert({
        created: new Date(),
        updated: new Date(),
        creator: BigInt(loginUserInfo.seq),
        updater: BigInt(loginUserInfo.seq),
        companyId: BigInt(loginUserInfo.companyId),
        sn: createSN(),
        addr: info.addr,
        memo: info.memo,
        name: info.name,
        state: info.state,
        optType: 0,
        bizUsage: info.bizUsage,
      });
      info.seq = Number(resultMallCompanyInfo.identifiers[0].seq);
    }

    if (code != 201) { // 회사정보 등록실패 하면 중단
      return returnJSONSingle(info, message, statusCode, code)
    }
    return returnJSONSingle(info,message,statusCode,code)
  }
}
