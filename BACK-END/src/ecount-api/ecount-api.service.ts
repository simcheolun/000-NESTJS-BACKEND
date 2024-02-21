import { Injectable } from '@nestjs/common';
import { CreateEcountApiDto } from './dto/create-ecount-api.dto';
import { UpdateEcountApiDto } from './dto/update-ecount-api.dto';

@Injectable()
export class EcountApiService {
  create(createEcountApiDto: CreateEcountApiDto) {
    return 'This action adds a new ecountApi';
  }

  findAll() {
    return `This action returns all ecountApi`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ecountApi`;
  }

  update(id: number, updateEcountApiDto: UpdateEcountApiDto) {
    return `This action updates a #${id} ecountApi`;
  }

  remove(id: number) {
    return `This action removes a #${id} ecountApi`;
  }
}
