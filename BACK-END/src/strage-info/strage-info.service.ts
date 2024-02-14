import _ from 'lodash'
import { Inject, Injectable } from '@nestjs/common';
import { storageInfoRepositoryMaster, storageInfoRepositorySlave } from './strage-info.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { storageInfoEntitySlave } from './entities/strage-info.entity';

@Injectable()
export class storageInfoService {
  cacheName = 'StorageInfoService'

  constructor(
    private storageInfoRepositoryMaster: storageInfoRepositoryMaster,
    @InjectRepository(storageInfoEntitySlave,'SLAVE')
    private storageInfoRepositorySlave: storageInfoRepositorySlave,
  ) { }
  // #-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-# READ
  async getStorageInfo(params: any, loginUserInfo: any) {

    const master = await this.storageInfoRepositoryMaster.getStorageInfo()
    const slave = await this.storageInfoRepositorySlave.find()//getStorageInfo(params,loginUserInfo)
    return { master, slave }
  }

}

