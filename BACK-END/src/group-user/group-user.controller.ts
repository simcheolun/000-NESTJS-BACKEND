import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Headers, Query } from '@nestjs/common';
import { GroupUserService } from './group-user.service';
import { JwtAuthGuard } from 'src/Auth/jwt-auth.guard';
import { ApiBearerAuth, ApiBody, ApiExcludeEndpoint, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { checkToken } from 'src/Auth/custom.function';
import { JwtService } from '@nestjs/jwt';
import { insertUserInfoSchema, listSchema, listSchemaGet, loginSchema, searchIdSchema, updateUserInfoSchema, updateUserPointSchema } from 'src/Auth/custom.body';

@ApiTags('사용자관리')
@Controller('api')
export class GroupUserController {
  constructor(
    private readonly groupUserService: GroupUserService,
    private readonly jwtService: JwtService,
  ) { }


  @Get('/createUserMany')
  @ApiExcludeEndpoint()

  @ApiOperation({
    summary: '사용자 다량생성',
    description: ``,
  })
  async createUserMany(@Query() params: any) {
    return await this.groupUserService.createUserMany(params);
  }

  @Get('/createPassword')
  @ApiOperation({
    summary: '비번생성',
    description: ``,
  })
  @ApiQuery(listSchemaGet[5])
  async createPassword(@Query() params: any) {
    return await this.groupUserService.createPassword(params);
  }

  @Get('/login')
  @ApiOperation({
    summary: '로그인',
    description: ``,
  })
  @ApiQuery(listSchemaGet[4])
  @ApiQuery(listSchemaGet[5])
  async login(@Query() params: any) {
    return await this.groupUserService.login(params);
  }

  @Post('/insertUserInfo')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('exjwtauthorization')
  @ApiOperation({
    summary: '사용자등록',
    description: ``,
  })
  @ApiBody({
    schema: insertUserInfoSchema
  })
  // insertUserInfo(@Body() createGroupUserDto: CreateGroupUserDto) {
  insertUserInfo(@Body() data: any) {
    return this.groupUserService.insertUserInfo(data);
  }

  @Get('/getUserInfo')
  @UseGuards(JwtAuthGuard) // 토큰검증
  @ApiBearerAuth('exjwtauthorization')
  @ApiOperation({
    summary: '사용자열람',
    description: ``,
  })
  @ApiQuery(listSchemaGet[0])
  @ApiQuery(listSchemaGet[1])
  @ApiQuery(listSchemaGet[2])
  async getUserInfo(@Query() params: any, @Headers('exjwtauthorization') token: any) {
    const tokenStatus = await checkToken(token, this.jwtService)
    if (tokenStatus.code != 200) { return tokenStatus }
    const loginUserInfo = tokenStatus.loginUserInfo
    return await this.groupUserService.getUserInfo(params, loginUserInfo);
  }

  @Get('/getUserInfoOne')
  @UseGuards(JwtAuthGuard) // 토큰검증
  @ApiBearerAuth('exjwtauthorization')
  @ApiOperation({
    summary: '사용자열람 - 낱개',
    description: ``,
  })
  @ApiQuery(listSchemaGet[3])
  async getUserInfoOne(@Query() params: any, @Headers('exjwtauthorization') token: any) {
    const tokenStatus = await checkToken(token, this.jwtService)
    if (tokenStatus.code != 200) { return tokenStatus }
    const loginUserInfo = tokenStatus.loginUserInfo
    return await this.groupUserService.getUserInfoOne(params, loginUserInfo);
  }

  @Get('/getMyInfo')
  @UseGuards(JwtAuthGuard) // 토큰검증
  @ApiBearerAuth('exjwtauthorization')
  @ApiOperation({
    summary: '나의정보열람',
    description: ``,
  })
  async getMyInfo(@Query() params: any, @Headers('exjwtauthorization') token: any) {
    const tokenStatus = await checkToken(token, this.jwtService)
    if (tokenStatus.code != 200) { return tokenStatus }
    const loginUserInfo = tokenStatus.loginUserInfo
    return await this.groupUserService.getMyInfo(loginUserInfo);
  }

  @Post('/delUserInfoCaching')
  @ApiExcludeEndpoint()
  @UseGuards(JwtAuthGuard) // 토큰검증
  @ApiBearerAuth('exjwtauthorization')
  @ApiOperation({
    summary: '캐시삭제',
    description: ``,
  })
  async delUserInfoCaching(@Headers() headers: any) {
    const tokenStatus = await checkToken(headers.exjwtauthorization, this.jwtService)
    if (tokenStatus.code != 200) {
      // return tokenStatus
    }
    return await this.groupUserService.delCaching();
  }

  @Post('/softRemoveUserInfo')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('exjwtauthorization')
  @ApiOperation({
    summary: '사용자 삭제 soft-remove',
    description: ``,
  })
  @ApiBody({ schema: searchIdSchema })
  async softRemoveUserInfo(@Body() params: any, @Headers('exjwtauthorization') token: any) {
    const tokenStatus = await checkToken(token, this.jwtService)
    if (tokenStatus.code != 200) { return tokenStatus }
    return await this.groupUserService.softRemoveUserInfo(params);
  }

  @Post('/removeUserInfo')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('exjwtauthorization')
  @ApiOperation({
    summary: '사용자 삭제 remove',
    description: ``,
  })
  @ApiBody({ schema: searchIdSchema })
  async removeUserInfo(@Body() params: any, @Headers('exjwtauthorization') token: any) {
    const tokenStatus = await checkToken(token, this.jwtService)
    if (tokenStatus.code != 200) { return tokenStatus }
    return await this.groupUserService.removeUserInfo(params);
  }

  @Post('/restoreUserInfo')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('exjwtauthorization')
  @ApiOperation({
    summary: '사용자 복구 restore-remove',
    description: ``,
  })
  @ApiBody({
    schema: searchIdSchema
  })
  async restoreUserInfo(@Body() params: any, @Headers('exjwtauthorization') token: any) {
    const tokenStatus = await checkToken(token, this.jwtService)
    if (tokenStatus.code != 200) {
      return tokenStatus
    }
    const loginUserInfo = tokenStatus.loginUserInfo
    return await this.groupUserService.restoreUserInfo(params);
  }


  @Post('/updateUserInfo')
  @ApiOperation({
    summary: '정보갱신',
    description: ``,
  })
  @ApiBody({
    schema: updateUserInfoSchema
  })
  async updateUserInfo(@Body() params: any) {
    return await this.groupUserService.updateUserInfo(params);
  }
  @Post('/updateUserPoint')
  @ApiOperation({
    summary: '포인트충전',
    description: ``,
  })
  @ApiBody({
    schema: updateUserPointSchema
  })
  async updateUserPoint(@Body() params: any) {
    return await this.groupUserService.updateUserPoint(params);
  }

  @Post('/updatePoint')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('exjwtauthorization')
  @ApiOperation({
    summary: '결과에 따라 포인트 추가/삭감',
    description: ``,
  })
  @ApiBody({
    schema: updateUserPointSchema
  })
  async updatePoint(@Body() params: any, @Headers('exjwtauthorization') token: any) {
    const tokenStatus = await checkToken(token, this.jwtService)
    if (tokenStatus.code != 200) {
      return tokenStatus
    }
    const loginUserInfo = tokenStatus.loginUserInfo
    return await this.groupUserService.updatePoint(params, loginUserInfo);
  }
}
