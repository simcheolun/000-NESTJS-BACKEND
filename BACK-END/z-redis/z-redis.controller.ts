import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Headers, Query } from '@nestjs/common';
import { JwtAuthGuard } from 'src/Auth/jwt-auth.guard';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { checkToken } from 'src/Auth/custom.function';
import { JwtService } from '@nestjs/jwt';
import { insertUserInfoSchema, listSchema, listSchemaGet, loginSchema, redisSchema, searchIdSchema, updateUserInfoSchema } from 'src/Auth/custom.body';
import { ZRedisService } from './z-redis.service';

@ApiTags('레디스관리')
@Controller('api')
export class ZRedisController {
  constructor(
    private readonly jwtService: JwtService,
    private readonly ZRedisService: ZRedisService
    ) { }


  @Get('/delCaching')
  @ApiOperation({
    summary: '캐싱키 삭제',
    description: ``,
  })
  @ApiQuery(redisSchema.keyName)
  async createUserMany(@Query() params: any) {
    return await this.ZRedisService.delCaching(params.keyName);
  }

  @Get('/getCaching')
  @ApiOperation({
    summary: '캐싱키값 열람',
    description: ``,
  })
  @ApiQuery(redisSchema.keyName)
  async getCaching(@Query() params: any) {
    return await this.ZRedisService.getCaching(params.keyName);
  }
}