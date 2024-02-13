import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TestService } from './test.service';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';
import { ApiBody } from '@nestjs/swagger';

@Controller('test')
export class TestController {
  constructor(private readonly TestService: TestService) {}
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
}
