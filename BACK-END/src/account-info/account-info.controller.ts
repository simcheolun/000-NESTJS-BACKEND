import { Controller, Get, Post, Body, Patch, Param, Delete, Headers, Ip, UseGuards } from '@nestjs/common';
import { AccountInfoService } from './account-info.service';
import { CreateAccountInfoDto } from './dto/create-account-info.dto';
import { ApiBearerAuth, ApiBody, ApiExcludeEndpoint, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from 'src/Auth/jwt-auth.guard';
import { chekcToken, returnJSONSingle } from 'src/Auth/custom.function';
import { Throttle } from '@nestjs/throttler';

@ApiTags('플랫폼 계정관리') // 매항목마다 제목생성
@Controller('api')
export class AccountInfoController {
  constructor(
    private readonly accountInfoService: AccountInfoService,
    private readonly jwtService: JwtService,
  ) { }

  // #-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-# 등록수정
  @UseGuards(JwtAuthGuard) // 토큰검증
  @ApiOperation({
    summary: '나의정보수정 - ACCOUNTINFO',
    description: '로그인후 사용하셈.',
  })
  @ApiBearerAuth('exjwtauthorization')
  @Throttle(1, 3) // 3초에 한번요청
  // @ApiBody({ type: CreateMallUserDto }) // try시 입력부분
  @ApiBody({
    schema: {
        type: 'object',
        properties: {
          language: { type: 'bigint', default: 0 },
          mail: { type: 'string', default: "example@mail.com" },
          memo: { type: 'string', default: null },
          phone: { type: 'string', default: '01000000000' },
          tel: { type: 'string', default: '0200000000' },
      },
    },
  })
  @Post('/setMyInfo')
  async setMyInfo(@Body() data: any, @Headers() headers: any) {
    const tokenStatus = await chekcToken(headers.exjwtauthorization, this.jwtService)
    if (tokenStatus.code != 200) {
      return returnJSONSingle(tokenStatus.result, tokenStatus.message, tokenStatus.statusCode, tokenStatus.code)
    }
    const loginUserInfo = tokenStatus.loginUserInfo
    return this.accountInfoService.setMyInfo(data, loginUserInfo)
  }

  // #-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-# 로그인
  @ApiOperation({
    summary: '로그인 - ACCOUNTINFO',
    description: '계정이 있는 사용자 로그인',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string', default: null },
        pw: { type: 'string', default: null },

      }
    }
  })
  // @ApiBody({ type: CreateAccountInfoDto })
  @Post('/LoginByInventory')
  async LoginbyInventory(@Body() params: any, @Ip() ip: any) {
    // return await this.accountInfoService.LoginbyInventory(params, ip);
  }
  // #-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-# 
  @Post('/getAccountInfo')
  @UseGuards(JwtAuthGuard) // 토큰검증
  @ApiOperation({
    summary: '계정정보 열람 - ACCOUNTINFO 부속테이블: companyInfo',
    description: `
    단일검색: SEQ
    LIKE 검색: 계정,이름,모바일,전화,메일,회사이름
    복합검색: COMPANYID AND SEARCHKEYWORD(계정,이름,모바일,전화,메일)
    메모리캐싱사용: CACHE: TRUE
    `,
  })
  @ApiBearerAuth('exjwtauthorization')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {

        objSearchMapper: {
          type: 'object',
          properties: {
            seq: { type: 'string', default: null },
            companyId: { type: 'string', default: null },
            searchKeyword: { type: 'string', default: null },
            cache: { type: 'boolean', default: false },
          },
        },
        page: { type: 'number', default: 1 },
        size: { type: 'number', default: 14 },

      }
    }
  })
  async getAccountInfo(@Body() params: any, @Headers() headers: any) {
    const tokenStatus = await chekcToken(headers.exjwtauthorization, this.jwtService)
    if (tokenStatus.code != 200) {
      return returnJSONSingle(tokenStatus.result, tokenStatus.message, tokenStatus.statusCode, tokenStatus.code)
    }
    const loginUserInfo = tokenStatus.loginUserInfo
    return await this.accountInfoService.getAccountInfo(params, loginUserInfo);
  }


  // #-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-# 삭제
  @UseGuards(JwtAuthGuard) // 토큰검증
  @ApiOperation({
    summary: '계정정보 삭제  - ACCOUNTINFO',
    description: `
    삭제유형: SOFT-REMOVE
    다중삭제:
    [
      {SEQ:N},
      {SEQ:N},
      ...
    ]`,
  })
  @ApiBearerAuth('exjwtauthorization')
  @ApiBody({
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          seq: { type: 'bigint', default: null },
        },
      },
    },
  })
  @Post('/stateAccountInfo')
  async delete(@Body() data: any, @Headers() headers: any) {
    const tokenStatus = await chekcToken(headers.exjwtauthorization, this.jwtService)
    if (tokenStatus.code != 200) {
      return returnJSONSingle(tokenStatus.result, tokenStatus.message, tokenStatus.statusCode, tokenStatus.code)
    }
    const loginUserInfo = tokenStatus.loginUserInfo
    return this.accountInfoService.delete(data, loginUserInfo)
  }

}
