import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Headers } from '@nestjs/common';
import { DevService } from './dev.service';
import { ApiBearerAuth, ApiExcludeEndpoint, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/Auth/jwt-auth.guard';

@ApiTags('테스트')
@Controller('dev')
export class DevController {
  constructor(private readonly devService: DevService) {}

  @Post('/getTest')
  // @ApiExcludeEndpoint()
  @UseGuards(JwtAuthGuard) // 토큰검증
  @ApiBearerAuth('exjwtauthorization')
  @ApiOperation({
    summary: '테스트',
    description: ``,
  })
  async getTest(@Headers() headers: any) {

    return await this.devService.getTest();
  }
}
