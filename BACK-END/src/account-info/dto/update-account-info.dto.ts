import { PartialType } from '@nestjs/swagger';
import { CreateAccountInfoDto } from './create-account-info.dto';

export class UpdateAccountInfoDto extends PartialType(CreateAccountInfoDto) {}
