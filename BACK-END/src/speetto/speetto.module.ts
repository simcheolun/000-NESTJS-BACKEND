import { Module } from '@nestjs/common';
import { SpeettoService } from './speetto.service';
import { SpeettoController } from './speetto.controller';
import { PukeService } from './puke.service';

@Module({
  controllers: [SpeettoController],
  providers: [SpeettoService,PukeService]
})
export class SpeettoModule {}
