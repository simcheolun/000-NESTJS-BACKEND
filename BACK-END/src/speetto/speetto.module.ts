import { Module } from '@nestjs/common';
import { SpeettoService } from './speetto.service';
import { SpeettoController } from './speetto.controller';

@Module({
  controllers: [SpeettoController],
  providers: [SpeettoService]
})
export class SpeettoModule {}
