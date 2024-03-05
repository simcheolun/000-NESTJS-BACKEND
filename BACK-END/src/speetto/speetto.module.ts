import { Module } from '@nestjs/common';
import { SpeettoService } from './speetto.service';
import { SpeettoController } from './speetto.controller';
import { PukeService } from './puke.service';
import { ErshiyidianService } from './ershiyidian.service';

@Module({
  controllers: [SpeettoController],
  providers: [SpeettoService,PukeService,ErshiyidianService]
})
export class SpeettoModule {}
