import { Injectable } from '@nestjs/common';
import { CreateDevDto } from './dto/create-dev.dto';
import { UpdateDevDto } from './dto/update-dev.dto';
import { ZRedisService } from 'z-redis/z-redis.service';

@Injectable()
export class DevService {
  constructor(
    private ZRedisService : ZRedisService,
  ){  }
 async getTest(){
  
  const keys=  await this.ZRedisService.getCaching('orange')
  console.log(keys)
 }
}
