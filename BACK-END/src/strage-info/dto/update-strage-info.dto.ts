import { PartialType } from '@nestjs/swagger';
import { CreateStrageInfoDto } from './create-strage-info.dto';

export class UpdateStrageInfoDto extends PartialType(CreateStrageInfoDto) {}
