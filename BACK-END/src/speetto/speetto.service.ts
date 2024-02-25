import { Injectable } from '@nestjs/common';
import { CreateSpeettoDto } from './dto/create-speetto.dto';
import { UpdateSpeettoDto } from './dto/update-speetto.dto';

@Injectable()
export class SpeettoService {
  create(createSpeettoDto: CreateSpeettoDto) {
    return 'This action adds a new speetto';
  }

  findAll() {
    return `This action returns all speetto`;
  }

  findOne(id: number) {
    return `This action returns a #${id} speetto`;
  }

  update(id: number, updateSpeettoDto: UpdateSpeettoDto) {
    return `This action updates a #${id} speetto`;
  }

  remove(id: number) {
    return `This action removes a #${id} speetto`;
  }
}
