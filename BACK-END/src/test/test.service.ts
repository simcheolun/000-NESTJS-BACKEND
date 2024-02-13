import { Injectable } from '@nestjs/common';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';
import { testMasterRepository, testSlaveRepository } from './test.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { testSlaveEntity } from './entities/test.entity';

@Injectable()
export class TestService {
  cacheName = 'StorageInfoService'

  constructor(
    private testMasterRepository: testMasterRepository,
    private testSlaveRepository: testSlaveRepository,
  ) { }
  async getTestinfo(params: any) {
    const master = await this.testMasterRepository.findOne({where:{}})
   const slave =  await this.testSlaveRepository.findOne({where:{}})
   return {master,slave}
  } 
}
