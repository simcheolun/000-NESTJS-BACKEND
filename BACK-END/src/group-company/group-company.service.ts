import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { consolE, createSN, Decrypt, Encrypt, GroupCompanyInsert, returnDataList, returnDataSingle, returnLoginData, returnMessage } from 'src/Auth/custom.function';
import { hash } from 'bcrypt';
import { ZRedisService } from 'z-redis/z-redis.service';
import bcrypt from 'bcrypt'
import { AuthService } from 'src/Auth/auth.service';
import { GroupCompanyRepository, GroupCompanyRepositorySlave } from './group-company.repository';
import { GroupCompanyEntitySlave } from './entities/group-company.entity';
import { GroupUserRepository } from 'src/group-user/group-user.repository';
import { messageSchema } from 'src/Auth/custom.body';

@Injectable()
export class GroupCompanyService {
  REDIS_KEY = process.env.REDIS_KEY_GORUP_COMPANY
  constructor(
    private readonly ZRedisService: ZRedisService,
    private readonly AuthService: AuthService,
    private GroupCompanyRepository: GroupCompanyRepository,
    @InjectRepository(GroupCompanyEntitySlave, 'SLAVE')
    private GroupCompanyRepositorySlave: GroupCompanyRepositorySlave,
    private GroupUserRepository: GroupUserRepository,
  ) { }
  // #-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-# READ
  async getCompanyInfo(params: any, loginCompanyInfo: any) {
    let caching = true
    let cachingData: any = await this.ZRedisService.getCaching(this.REDIS_KEY)
    if (!cachingData) {
      cachingData = await this.GroupCompanyRepositorySlave.find()
      await this.ZRedisService.setCaching(this.REDIS_KEY, cachingData)
      caching = false
    }

    const { page = 1, size = 14, searchKeyword } = params
    let filteredData = cachingData;
    if (searchKeyword) {
      filteredData = cachingData.filter((item: any) =>
        item.user_name.includes(searchKeyword)
      )
    }
    const total = filteredData.length
    const startIndex = (page - 1) * size
    const endIndex = startIndex + size
    const paginatedData = filteredData.slice(startIndex, endIndex);

    return returnDataList(paginatedData, total, page, size, caching)
  }
  async getCompanyInfoOne(params: any, loginCompanyInfo: any) {
    let caching = true
    let cachingData: any = await this.ZRedisService.getCaching(this.REDIS_KEY)
    if (!cachingData) {
      cachingData = await this.GroupCompanyRepositorySlave.find()
      await this.ZRedisService.setCaching(this.REDIS_KEY, cachingData)
      caching = false
    }
    const { id } = params
    let filteredData = cachingData;
    if (id) {
      filteredData = cachingData.filter((item: any) =>
        item.id == id
      )
    }
    return returnDataSingle(filteredData[0], 200, true)
  }
  // #-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-# insert
  async insertCompanyInfo(data: any, loginUserInfo: any) {
    if(loginUserInfo.company_id){
      return returnMessage(messageSchema.companyFIND,400,false)
    }
    data.loginUserInfo = loginUserInfo
    const newData = await this.GroupCompanyRepository.insert(GroupCompanyInsert(data))
    data.id = newData.identifiers[0].id
    await this.GroupUserRepository.update({ id: loginUserInfo.id },{ company_id: data.id })
    let cachingData = await this.ZRedisService.getCachingList(this.REDIS_KEY)
    if (!cachingData) {
      cachingData = await this.GroupCompanyRepositorySlave.find()
      await this.ZRedisService.setCaching(this.REDIS_KEY, cachingData)
    } else {
      cachingData.push(data)
      await this.ZRedisService.setCaching(this.REDIS_KEY, cachingData)
    }
    // 등록한 정보 반환
    return returnDataSingle(data, 201, false)
  }

  // #-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-# delete Caching
  async delCompanyInfoCaching() {
    await this.ZRedisService.delCaching(this.REDIS_KEY)
    return returnDataSingle(null, 201, true)
  }

  // #-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-# soft remove user
  async softRemoveCompanyInfo(data: any) {
    const findData: any = await this.GroupCompanyRepository.findOne({ where: { id: data.id } })
    await this.GroupCompanyRepository.softRemove(data)
    let cachingData = await this.GroupCompanyRepositorySlave.find()
    await this.ZRedisService.setCaching(this.REDIS_KEY, cachingData)
    return returnDataSingle(findData, 201, false)
  }

  async removeCompanyInfo(data: any) {
    const findData: any = await this.GroupCompanyRepository.findOne({ where: { id: data.id } })
    await this.GroupCompanyRepository.remove(data)
    let cachingData = await this.GroupCompanyRepositorySlave.find()
    await this.ZRedisService.setCaching(this.REDIS_KEY, cachingData)
    return returnDataSingle(findData, 201, false)
  }

  // #-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-# restore user
  async restoreCompanyInfo(data: any) {
    await this.GroupCompanyRepository.restore(data)
    let cachingData = await this.GroupCompanyRepositorySlave.find()
    await this.ZRedisService.setCaching(this.REDIS_KEY, cachingData)
    const returnData = cachingData.find((item: any) => item.id == data.id)
    return returnDataSingle(returnData, 201, true)
  }

  async updateCompanyInfo(data: any, loginCompanyInfo: any) {
    await this.GroupCompanyRepository.update({
      id: data.id
    }, {
      company_license: createSN(),
      company_name: data.company_name,
      company_post_number: data.company_post_number,
      company_address: data.company_address,
      updated: new Date(),
      updater: loginCompanyInfo.id
    })
    let cachingData = await this.GroupCompanyRepository.find()
    await this.ZRedisService.setCaching(this.REDIS_KEY, cachingData)
    return returnDataSingle(data, 201, false)
  }
}

