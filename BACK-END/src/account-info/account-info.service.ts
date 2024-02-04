import { Injectable } from '@nestjs/common';
import { CreateAccountInfoDto } from './dto/create-account-info.dto';
import { UpdateAccountInfoDto } from './dto/update-account-info.dto';

@Injectable()
export class AccountInfoService {
  create(createAccountInfoDto: CreateAccountInfoDto) {
    return 'This action adds a new accountInfo';
  }

  findAll() {
    return `This action returns all accountInfo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} accountInfo`;
  }

  update(id: number, updateAccountInfoDto: UpdateAccountInfoDto) {
    return `This action updates a #${id} accountInfo`;
  }

  remove(id: number) {
    return `This action removes a #${id} accountInfo`;
  }
}
