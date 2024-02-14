import { Controller, Get, Post, Body, Patch, Param, Delete, Headers, Ip, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiExcludeEndpoint, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from 'src/Auth/jwt-auth.guard';
import { checkToken, returnJSONSingle } from 'src/Auth/custom.function';
import { Throttle } from '@nestjs/throttler';
import { storageInfoService } from './strage-info.service';

@ApiTags('창고관리') // 매항목마다 제목생성
@Controller('api')
export class storageInfoController {
  constructor(
    private readonly storageInfoService: storageInfoService,
    private readonly jwtService: JwtService,
  ) { }

  // #-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-# 
  @Post('/getStorageInfo')
  @UseGuards(JwtAuthGuard) // 토큰검증
  @ApiOperation({
    summary: '창고열람',
    description: ``,
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
            searchKeyword: { type: 'string', default: null },
          },
        },
        page: { type: 'number', default: 1 },
        size: { type: 'number', default: 14 },

      }
    }
  })
  async getStorageInfo(@Body() params: any, @Headers() headers: any) {
    const tokenStatus = await checkToken(headers.exjwtauthorization, this.jwtService)
    if (tokenStatus.code != 200) {
      // return returnJSONSingle(tokenStatus.result, tokenStatus.message, tokenStatus.statusCode, tokenStatus.code)
    }
    const loginUserInfo = tokenStatus.loginUserInfo
    return await this.storageInfoService.getStorageInfo(params, loginUserInfo);
  }


}
