import _ from 'lodash'
import { Inject, Injectable } from '@nestjs/common';
import { ZRedisService } from 'z-redis/z-redis.service';
import { createSN, returnJSONSingle } from 'src/Auth/custom.function';
import { AccountInfoRepositoryMaster, AccountInfoRepositorySlave } from './account-info.repository';
import { AccountInfoEntityMaster, AccountInfoEntitySlave } from './entities/account-info.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AccountInfoService {
  cacheName = 'StorageInfoService'

  constructor(
    // @InjectRepository(AccountInfoEntityMaster)
    private AccountInfoRepositoryMaster: AccountInfoRepositoryMaster,
    // @InjectRepository(AccountInfoEntitySlave, 'SLAVE')
    // private AccountInfoRepositorySlave: Repository<AccountInfoEntitySlave>,
    private AccountInfoRepositorySlave: AccountInfoRepositorySlave,
    private ZRedisService: ZRedisService,
  ) { }
  // #-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-# READ
  async getAccountInfo(params: any, loginUserInfo: any) {

  //   const master = await this.AccountInfoRepositoryMaster.findOne({where:{}})
  //  const slave =  await this.AccountInfoRepositorySlave.findOne({where:{}})
  const master = await this.AccountInfoRepositoryMaster.getAccountInfo()
  const slave =  await this.AccountInfoRepositorySlave.getAccountInfo(params,loginUserInfo)
   return {master,slave}
  }
  // update #-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#
  async setMyInfo(params: any, loginUserInfo: any) {
    console.log(params)
   await this.AccountInfoRepositoryMaster.update(
      { seq: loginUserInfo.seq },
      {
        language: params.language,
        mail: params.mail,
        memo: params.memo,
        phone: params.phone,
        tel: params.tel
      }
    )
    return returnJSONSingle(params, '요청이 반영되었습니다.', 'OK', 201)
  }
  // delete #-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#
  async delete(params: any, loginUserInfo: any) {
    await this.AccountInfoRepositoryMaster.update(
      { seq: params.seq },
      {
        state: 1
      }
    )
    return returnJSONSingle(params, '요청이 반영되었습니다.', 'OK', 201)
  }
  // login #-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#
  async LoginbyInventory(params: any, ip: any) {
    const loginData: any = await this.AccountInfoRepositorySlave.LoginbyInventory(params, ip);
    return loginData

    // const staffInfo = await this.AccountInfoRepositorySlave.find({ where: { companyId: allData.body?.accountInfo?.companyId } })
    // const newStaffInfo = staffInfo.map((item: any) => {
    //   const { pw, sn, authority, language, ips, created, lastDate, updated, creator, updater, ...rest } = item;
    //   return rest
    // })
    // allData.body.accountInfo.staffInfo = newStaffInfo
    // return allData
  }
}

