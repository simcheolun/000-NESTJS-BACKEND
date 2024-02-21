import { PartialType } from '@nestjs/swagger';
import { CreateEcountApiDto } from './create-ecount-api.dto';

export class UpdateEcountApiDto extends PartialType(CreateEcountApiDto) {}
