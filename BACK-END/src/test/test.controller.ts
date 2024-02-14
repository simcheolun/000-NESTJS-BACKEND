import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, Headers } from '@nestjs/common';
import { TestService } from './test.service';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/Auth/jwt-auth.guard';
import { Throttle } from '@nestjs/throttler';

@Controller('test')
export class TestController {
  constructor(private readonly TestService: TestService) { }
  // #-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-# 
  @Post('/getTestinfo')
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
  async getAccountInfo(@Body() params: any) {
    return await this.TestService.getTestinfo(params);
  }
  @Get('getCalc')
  @UseGuards(JwtAuthGuard) // 토큰검증
  @ApiBearerAuth('exjwtauthorization')
  @Throttle(1, 3) // 3초에 한번요청
  @ApiOperation({ summary: 'get' })
  @ApiQuery({ name: 'JINNIANYUE', type: String, example: 2024 })
  @ApiQuery({ name: 'CHUSHENGNIAN', type: String, example: 1977 })
  async getCalc(
    @Query('JINNIANYUE') JINNIANYUE: number,
    @Query('CHUSHENGNIAN') CHUSHENGNIAN: number,
    @Headers() headers: any
  ) {
    return JINNIANYUE - CHUSHENGNIAN + 1
  }
}
