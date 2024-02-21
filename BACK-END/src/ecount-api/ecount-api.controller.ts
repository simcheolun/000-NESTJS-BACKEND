import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Headers, Query } from '@nestjs/common';
import { JwtAuthGuard } from 'src/Auth/jwt-auth.guard';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { checkToken } from 'src/Auth/custom.function';
import { JwtService } from '@nestjs/jwt';
import { ecountApisSchema, insertCompanyInfoSchema, listSchema, listSchemaGet, loginSchema, searchIdSchema, updateCompanyInfoSchema } from 'src/Auth/custom.body';
import { EcountApiService } from './ecount-api.service';

@ApiTags('이카운트 API관리')
@Controller('api')
export class EcountApiContoroller {
  constructor(
    private readonly jwtService: JwtService,
    private readonly EcountApiService:EcountApiService
  ) { }


  @Post('/login')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('exjwtauthorization')
  @ApiOperation({
    summary: '이카운트 로그인',
    description: ``,
  })
  @ApiBody({
    schema: ecountApisSchema.login
  })
  async insertCompanyInfo(@Body() data: any,@Headers('exjwtauthorization') token: any) {
    // const tokenStatus = await checkToken(token, this.jwtService)
    // if (tokenStatus.code != 200) { return tokenStatus }
    // const loginUserInfo = tokenStatus.loginUserInfo
    return await this.EcountApiService.login(data)
  }

  @Post('/GetListInventoryBalanceStatus')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('exjwtauthorization')
  @ApiOperation({
    summary: '이카운트 재고현황',
    description: ``,
  })
  @ApiBody({
    schema: ecountApisSchema.GetListInventoryBalanceStatus
  })
  async GetListInventoryBalanceStatus(@Body() data: any,@Headers('exjwtauthorization') token: any) {
    return await this.EcountApiService.재고현황(data)
  }
}
