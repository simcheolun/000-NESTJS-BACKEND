import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Headers, Query } from '@nestjs/common';
import { DevService } from './dev.service';
import { ApiBearerAuth, ApiExcludeEndpoint, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/Auth/jwt-auth.guard';
import { NESTJSproject, redisSchema } from 'src/Auth/custom.body';
import { MallService } from './mall.service';

@ApiTags('테스트')
@Controller('dev')
export class DevController {
  constructor(
    private readonly devService: DevService,
    private readonly MallService:MallService
    ) {}

   // --------------------------------------------------------
  @Get('/createNESTJSproject')
  @UseGuards(JwtAuthGuard) // 토큰검증
  @ApiBearerAuth('exjwtauthorization')
  @ApiOperation({
    summary: '엔티티,리퍼지토리,서비스,컨트롤러 생성',
    description: ``,
  })
  @ApiQuery(NESTJSproject.Entity)
  @ApiQuery(NESTJSproject.projectName)
  @ApiQuery(NESTJSproject.database)
  @ApiQuery(NESTJSproject.schema)
  @ApiQuery(NESTJSproject.table)
  async getUserInfoOne(@Query() params: any) {
    return this.devService.convertToTypeScript(params);
  }

   // --------------------------------------------------------
  @Post('/getTest')
  // @ApiExcludeEndpoint()
  @UseGuards(JwtAuthGuard) // 토큰검증
  @ApiBearerAuth('exjwtauthorization')
  @ApiOperation({
    summary: '테스트',
    description: ``,
  })
  async getTest(@Headers() headers: any) {
    return await this.MallService.getSalesProductInfo();
  }

}


