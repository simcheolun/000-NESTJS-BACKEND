import { PartialType } from '@nestjs/swagger';
import { CreateGroupCompanyDto } from './create-group-company.dto';

export class UpdateGroupCompanyDto extends PartialType(CreateGroupCompanyDto) {}
