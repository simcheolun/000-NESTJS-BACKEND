import _ from 'lodash'
import { Inject, Injectable } from '@nestjs/common';
import { storageInfoRepositoryMaster, storageInfoRepositorySlave } from './strage-info.repository';

@Injectable()
export class storageInfoService {
  cacheName = 'StorageInfoService'

  constructor(
    private storageInfoRepositoryMaster: storageInfoRepositoryMaster,
    private storageInfoRepositorySlave: storageInfoRepositorySlave,
  ) { }
  // #-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-# READ
  async getStorageInfo(params: any, loginUserInfo: any) {

    const master = await this.storageInfoRepositoryMaster.getStorageInfo()
    const slave = await this.storageInfoRepositorySlave.getStorageInfo(params,loginUserInfo)
    return { master, slave }
  }

}

