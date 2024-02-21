import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Headers, Query } from '@nestjs/common';
import { JwtAuthGuard } from 'src/Auth/jwt-auth.guard';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { checkToken } from 'src/Auth/custom.function';
import { JwtService } from '@nestjs/jwt';
import { ecountApisSchema, insertCompanyInfoSchema, listSchema, listSchemaGet, loginSchema, searchIdSchema, updateCompanyInfoSchema } from 'src/Auth/custom.body';

@ApiTags('이카운트 API관리')
@Controller('api')
export class EcountApiContoroller {
  constructor(
    private readonly jwtService: JwtService,
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
  }
}
