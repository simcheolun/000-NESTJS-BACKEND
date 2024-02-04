import { Body, Controller, Post, Headers, UseGuards } from '@nestjs/common';
import { searchParams } from './search.params';
import { StorageInfoService } from './storage-info.service';
import { ApiBearerAuth, ApiBody, ApiExcludeEndpoint, ApiOperation } from '@nestjs/swagger';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from 'src/Auth/jwt-auth.guard';
import { chekcToken, returnJSONSingle } from 'src/Auth/custom.function';

@Controller('api')
export class StorageInfoController {
  // 서비스 주입
  constructor(
    private readonly StorageInfoService: StorageInfoService,
    private readonly jwtService: JwtService,
  ) { }


  @Post('/getStorageInfo')
  @UseGuards(JwtAuthGuard) // 토큰검증
  @ApiBearerAuth('exjwtauthorization')
  @ApiOperation({
    summary: '플랫폼 창고정보 열람',
    description: '로그인후 사용하셈.',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        objSearchMapper: {
          type: 'object',
          properties: {
            searchKeyword: { type: 'string', default: null },
            seq: { type: 'string', default: null },
            cache: { type: 'boolean', default: false },
          },
        },
        page: { type: 'number', default: 1 },
        size: { type: 'number', default: 14 },
      }
    }
  })
  async getStorageInfo(@Body() params: searchParams, @Headers() headers: any) {
    const tokenStatus = await chekcToken(headers.exjwtauthorization, this.jwtService)
    if (tokenStatus.code != 200) {
      return returnJSONSingle(tokenStatus.result, tokenStatus.message, tokenStatus.statusCode, tokenStatus.code)
    }
    const loginUserInfo = tokenStatus.loginUserInfo
    return await this.StorageInfoService.getStorageInfo(params, loginUserInfo);
  }
  // #-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-# 등록수정
  @Post('/setStorageInfo')
  @UseGuards(JwtAuthGuard) // 토큰검증
  @ApiBearerAuth('exjwtauthorization')
  @ApiOperation({
    summary: '창고정보 등록수정 - STORAGE_INFO',
    description: '',
  })
  // @ApiBody({ type: CreateMallUserDto }) // try시 입력부분
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        seq: { type: 'bigint', default: null },
        name: { type: 'string', default: '제일공업사' },
        addr: { type: 'string', default: '대표자' },
        memo: { type: 'string', default: '0269254127' },
        bizUsage: { type: 'int', default: 1 },
      },
    },
  })
  async setStorageInfo(@Body() data: any, @Headers() headers: any) {
    const tokenStatus = await chekcToken(headers.exjwtauthorization, this.jwtService)
    if (tokenStatus.code != 200) {
      return returnJSONSingle(tokenStatus.result, tokenStatus.message, tokenStatus.statusCode, tokenStatus.code)
    }
    const loginUserInfo = tokenStatus.loginUserInfo
    return this.StorageInfoService.setStorageInfo(data, loginUserInfo)
  }
}
