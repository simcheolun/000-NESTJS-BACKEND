import { Injectable } from '@nestjs/common';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';
import { testMasterRepository, testSlaveRepository } from './test.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { testSlaveEntity } from './entities/test.entity';

@Injectable()
export class TestService {
  cacheName = 'TEST-SERVICE'

  constructor(
    private testMasterRepository: testMasterRepository,
    @InjectRepository(testSlaveEntity,'SLAVE') 
    private testSlaveRepository: testSlaveRepository,
    ) { }
  async getTestinfo(params: any) {
  const master = await this.testMasterRepository.getTestInfo()
  const slave = await this.testSlaveRepository.findOne({where:{}})
  return { master, slave }
}
}
