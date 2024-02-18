import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Headers, Query } from '@nestjs/common';
import { JwtAuthGuard } from 'src/Auth/jwt-auth.guard';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { checkToken } from 'src/Auth/custom.function';
import { JwtService } from '@nestjs/jwt';
import { insertCompanyInfoSchema, listSchema, listSchemaGet, loginSchema, searchIdSchema, updateCompanyInfoSchema } from 'src/Auth/custom.body';
import { GroupCompanyService } from './group-company.service';

@ApiTags('회사관리')
@Controller('api')
export class GroupCompanyController {
  constructor(
    private readonly GroupCompanyService: GroupCompanyService,
    private readonly jwtService: JwtService,
  ) { }


  @Post('/insertCompanyInfo')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('exjwtauthorization')
  @ApiOperation({
    summary: '회사등록',
    description: `회사정보 관리id == 회사등록 사용자id`,
  })
  @ApiBody({
    schema: insertCompanyInfoSchema
  })
  // insertCompanyInfo(@Body() createGroupUserDto: CreateGroupUserDto) {
  async insertCompanyInfo(@Body() data: any,@Headers('exjwtauthorization') token: any) {
    const tokenStatus = await checkToken(token, this.jwtService)
    if (tokenStatus.code != 200) { return tokenStatus }
    const loginUserInfo = tokenStatus.loginUserInfo
    return this.GroupCompanyService.insertCompanyInfo(data,loginUserInfo);
  }

  @Get('/getCompanyInfo')
  @UseGuards(JwtAuthGuard) // 토큰검증
  @ApiBearerAuth('exjwtauthorization')
  @ApiOperation({
    summary: '회사열람',
    description: ``,
  })
  @ApiQuery(listSchemaGet[0])
  @ApiQuery(listSchemaGet[1])
  @ApiQuery(listSchemaGet[2])
  async getCompanyInfo(@Query() params: any, @Headers('exjwtauthorization') token: any) {
    const tokenStatus = await checkToken(token, this.jwtService)
    if (tokenStatus.code != 200) { return tokenStatus }
    const loginUserInfo = tokenStatus.loginUserInfo
    return await this.GroupCompanyService.getCompanyInfo(params, loginUserInfo);
  }

  @Get('/getCompanyInfoOne')
  @UseGuards(JwtAuthGuard) // 토큰검증
  @ApiBearerAuth('exjwtauthorization')
  @ApiOperation({
    summary: '회사열람 - 낱개',
    description: ``,
  })
  @ApiQuery(listSchemaGet[3])
  async getCompanyInfoOne(@Query() params: any, @Headers('exjwtauthorization') token: any) {
    const tokenStatus = await checkToken(token, this.jwtService)
    if (tokenStatus.code != 200) { return tokenStatus }
    const loginUserInfo = tokenStatus.loginUserInfo
    return await this.GroupCompanyService.getCompanyInfoOne(params, loginUserInfo);
  }

  @Post('/delCompanyInfoCaching')
  @UseGuards(JwtAuthGuard) // 토큰검증
  @ApiBearerAuth('exjwtauthorization')
  @ApiOperation({
    summary: '캐시삭제',
    description: ``,
  })
  async delCompanyInfoCaching(@Headers('exjwtauthorization') token: any) {
    const tokenStatus = await checkToken(token, this.jwtService)
    if (tokenStatus.code != 200) { return tokenStatus }
    const loginUserInfo = tokenStatus.loginUserInfo
    return await this.GroupCompanyService.delCompanyInfoCaching();
  }

  @Post('/softRemoveCompanyInfo')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('exjwtauthorization')
  @ApiOperation({
    summary: '회사삭제 soft-remove',
    description: ``,
  })
  @ApiBody({
    schema: searchIdSchema
  })
  async softRemoveCompanyInfo(@Body() params: any, @Headers('exjwtauthorization') token: any) {
    const tokenStatus = await checkToken(token, this.jwtService)
    if (tokenStatus.code != 200) { return tokenStatus }
    const loginUserInfo = tokenStatus.loginUserInfo
    return await this.GroupCompanyService.softRemoveCompanyInfo(params);
  }

  @Post('/removeCompanyInfo')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('exjwtauthorization')
  @ApiOperation({
    summary: '회사삭제 remove',
    description: ``,
  })
  @ApiBody({
    schema: searchIdSchema
  })
  async removeCompanyInfo(@Body() params: any, @Headers('exjwtauthorization') token: any) {
    const tokenStatus = await checkToken(token, this.jwtService)
    if (tokenStatus.code != 200) { return tokenStatus }
    const loginUserInfo = tokenStatus.loginUserInfo
    return await this.GroupCompanyService.removeCompanyInfo(params);
  }

  @Post('/restoreCompanyInfo')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('exjwtauthorization')
  @ApiOperation({
    summary: '사용자 복구 restore-remove',
    description: ``,
  })
  @ApiBody({
    schema: searchIdSchema
  })
  async restoreCompanyInfo(@Body() params: any, @Headers('exjwtauthorization') token: any) {
    const tokenStatus = await checkToken(token, this.jwtService)
    if (tokenStatus.code != 200) { return tokenStatus }
    const loginUserInfo = tokenStatus.loginUserInfo
    return await this.GroupCompanyService.restoreCompanyInfo(params);
  }

  
  @Post('/updateCompanyInfo')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('exjwtauthorization')
  @ApiOperation({
    summary: '정보갱신',
    description: ``,
  })
  @ApiBody({
    schema: updateCompanyInfoSchema
  })
  async updateCompanyInfo(@Body() params: any, @Headers('exjwtauthorization') token: any) {
    const tokenStatus = await checkToken(token, this.jwtService)
    if (tokenStatus.code != 200) { return tokenStatus }
    const loginUserInfo = tokenStatus.loginUserInfo
    return await this.GroupCompanyService.updateCompanyInfo(params,loginUserInfo);
  }
}
