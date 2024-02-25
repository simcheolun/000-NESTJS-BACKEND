import { PartialType } from '@nestjs/swagger';
import { CreateSpeettoDto } from './create-speetto.dto';

export class UpdateSpeettoDto extends PartialType(CreateSpeettoDto) {}
