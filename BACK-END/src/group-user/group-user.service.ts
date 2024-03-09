import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GroupUserRepository } from './group-user.repository';
import { consolE, createSN, Decrypt, Encrypt, getpaginatedData, GroupUserInsert, GroupUserUpdate, returnJSONSingle, returnLoginData, returnMessage, getDataForId, getDataForKeyword, GroupUserPointUpdate, getData } from 'src/Auth/custom.function';
import { hash } from 'bcrypt';
import { ZRedisService } from 'z-redis/z-redis.service';
import bcrypt from 'bcrypt'
import { AuthService } from 'src/Auth/auth.service';
import { messageSchema, statusCode } from 'src/Auth/custom.body';

@Injectable()
export class GroupUserService {
  REDIS_KEY = process.env.REDIS_KEY_GORUP_USER
  constructor(
    private readonly ZRedisService: ZRedisService,
    private readonly AuthService: AuthService,
    private GroupUserRepository: GroupUserRepository,
  ) { }
  /* #-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-# 
            사용자 20만개 생성
   #-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-# */
  async createUserMany(params: any) {
    const userInfo = {
      user_number: 1234567890,
      user_name: '엄광일',
      user_sex: 'n',
      user_borth: '19000000',
      login_id: 'loginID',
      login_pw: '$2b$10$tgtaDimJ4Iefq1k1yC9bzuD6J.okW/Bahz7/2xe3rb28VlLKWDqp6',
      user_email: 'email@tokkai.com',
      user_mobile: '01032101234',
      user_post_number: '100555',
      user_address: '서울시 강남구 도곡동 271-1',
      company_id: 555
    }
    let userInfos: any[] = []
    for (let i = 3; i < 5000; i++) {
      userInfos.push(userInfo)
    }
    await this.GroupUserRepository.insert(userInfos)
    return '완성되었음.'
  }

  /* #-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-# 
           비번생성
  #-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-# */
  async createPassword(data: any) {
    // 받은 암호문자열 암호화
    const hashedPassword = await hash(data.login_pw, 10)
    const encryptText = Encrypt(data.login_pw)
    return {
      passwordText: data.login_pw,
      hashedPassword: hashedPassword,
      encryptText: encryptText,
    }
  }
  /* #-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-# 
           사용자 정보열람 []
  #-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-# */
  async getUserInfo(params: any, loginUserInfo: any) {
    // const ddd = (await this.GroupUserRepository.test(1))
    //   .joinInfo('storage', 'id', 'id', 'storageInfo')
    //   .joinInfo('company', 'company_id', 'id', 'companyInfo')
    //   .joinInfo('home', 'home_id', 'id', 'homeInfo')
    const resultdata = await this.GroupUserRepository.getUserInfo(params, loginUserInfo)
    const { body, page, size } = resultdata
    return resultdata
  }
  /* #-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-# 
           사용자 정보열람 {}
  #-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-# */
  async getMyInfo(loginUserInfo: any) {
    const myInfo = await this.GroupUserRepository.findOne({ where: { id: loginUserInfo.id } })
    return getData(myInfo, true, 0, 1,)
  }
  async getUserInfoOne(params: any, loginUserInfo: any) {
    const myInfo = await this.GroupUserRepository.findOne({ where: { id: loginUserInfo.id } })
    return getData(myInfo, true, 0, 1,)
  }

  /* #-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-# 
             사용자 정보등록
  #-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-# */
  async insertUserInfo(data: any) {
    // 암호생성
    data.hashedPassword = await hash(data.login_pw, 10)
    // 사용자 정보 삽입
    const newData = await this.GroupUserRepository.insert(GroupUserInsert(data))
    // 등록된 ID 추출
    data.id = newData.identifiers[0].id

    // 등록한 정보 반환
    return getData(data, true, 0, 1,)
  }
  /* #-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-# 
             사용자 정보갱신
  #-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-# */
  async updateUserInfo(data: any) {
    await this.GroupUserRepository.update({
      id: data.id
    }, GroupUserUpdate(data))
    return getData(data, true, 0, 1,)
  }

  async updatePoint(data: any, loginUserInfo: any) {
    const currentInfo: any = await this.GroupUserRepository.findOne({ where: { id: loginUserInfo.id } })
    switch (data.status) {
      case '1등': {
        currentInfo.point += 200000
        break;
      }
      case '2등': {
        currentInfo.point += 100000
        break;
      }
      case '3등': {
        currentInfo.point += 50000
        break;
      }
      case '4등': {
        currentInfo.point += 20000
        break;
      }
      case '5등': {
        currentInfo.point += 10000
        break;
      }
      case '구매': {
        currentInfo.point += -10000
        break;
      }
    }
    if (currentInfo.point < 0) {
      currentInfo.point = 0
      return returnJSONSingle(currentInfo, '충전후 이용하여주세요.', 'OK', 400)
    }
    await this.GroupUserRepository.update({
      id: currentInfo.id
    }, { point: currentInfo.point })

    return getData(currentInfo, true, 200, 400,)
  }

  async updateUserInfo_caching(data: any) {
    await this.GroupUserRepository.update({
      id: data.id
    }, GroupUserUpdate(data))
    let cachingData = await this.GroupUserRepository.find()
    await this.ZRedisService.setCaching(this.REDIS_KEY, cachingData)
    return getData(data, true, 200, 400,)
  }
  async updateUserPoint(data: any) {
    await this.GroupUserRepository.update({
      id: data.id
    }, GroupUserPointUpdate(data))
    return getData(data, false, 200, 400,)
  }


  /* #-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-# 
             캐싱삭제
  #-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-# */
  async delCaching() {
    await this.ZRedisService.delCaching(this.REDIS_KEY)
    return returnMessage(messageSchema.processOK, 201, true)
  }
  /* #-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-# 
             사용자 정보 완전삭제
    #-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-# */
  async removeUserInfo(data: any) {
    const dataArrary = Array.isArray(data) ? data : [data];
    await this.GroupUserRepository.remove(dataArrary)
    let cachingData = await this.GroupUserRepository.find()
    await this.ZRedisService.setCaching(this.REDIS_KEY, cachingData)
    return returnMessage(messageSchema.processOK, 201, false)
  }
  /* #-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-# 
             사용자 정보삭제 - 소프트
  #-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-# */
  async softRemoveUserInfo(data: any) {
    const dataArrary = Array.isArray(data) ? data : [data];
    const resultData = await this.GroupUserRepository.softRemove(dataArrary)
    let cachingData = await this.GroupUserRepository.find()
    await this.ZRedisService.setCaching(this.REDIS_KEY, cachingData)
    return returnMessage(messageSchema.processOK, 201, false)
  }
  /* #-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-# 
             사용자 정보복구
  #-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-# */
  async restoreUserInfo(data: any) {
    await this.GroupUserRepository.restore(data)
    let cachingData = await this.GroupUserRepository.find()
    await this.ZRedisService.setCaching(this.REDIS_KEY, cachingData)
    const returnData = cachingData.find((item: any) => item.id == data.id)
    return getData(returnData, true, 200, 400,)
  }
  /* #-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-# 
             로그인
  #-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-# */

  async login(data: any) {
    const { login_id, login_pw } = data
    const currentData: any = await this.GroupUserRepository.findOne({
      where: { login_id },      // select: ["login_id", "login_pw"]
    })
    if (currentData) {
      const isValidPassword = await bcrypt.compare(login_pw, currentData.login_pw);
      if (isValidPassword) {
        const jwtPayload: any = { loginInfo: currentData };
        const jwtToken = await this.AuthService.createToken(jwtPayload);
        currentData.login_token = jwtToken
        delete currentData.login_pw
        delete currentData.deleteAt
        return returnLoginData(currentData, messageSchema.processOK, 200, true)
      } else {
        return returnLoginData(data, messageSchema.passwordERROR, 400, true)
      }
    } else {
      return returnLoginData(data, messageSchema.userNOTFIND, 400, true)
    }
  }

}

