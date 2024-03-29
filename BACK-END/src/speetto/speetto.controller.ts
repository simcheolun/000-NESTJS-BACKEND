import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { SpeettoService } from './speetto.service';
import { CreateSpeettoDto } from './dto/create-speetto.dto';
import { UpdateSpeettoDto } from './dto/update-speetto.dto';
import { ApiBearerAuth, ApiBody, ApiQuery } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/Auth/jwt-auth.guard';
import { PukeService } from './puke.service';
import { pukeSpito } from 'src/Auth/custom.body';
import { ErshiyidianService } from './ershiyidian.service';

@Controller('api')
export class SpeettoController {
  constructor(
    private readonly speettoService: SpeettoService,
    private readonly PukeService: PukeService,
    private readonly ErshiyidianService: ErshiyidianService,
    ) { }

  @Post('/speetto')
  @UseGuards(JwtAuthGuard) // 토큰검증
  @ApiBearerAuth('exjwtauthorization')
  async speetto() {
    let data: any
    const randomNumber = Math.random() * 100;
    if (randomNumber == 1) {
      data = "1등";
    } else if (randomNumber < 1) {
      data = "2등";
    } else if (randomNumber < 1) {
      data = "3등";
    } else if (randomNumber < 10) {
      data = "4등";
    } else if (randomNumber < 10) {
      data = "5등";
    } else {
      data = "꽝!";
    }

    return { data, code: 200 }
  }

  @Post('/redTen')
  @UseGuards(JwtAuthGuard) // 토큰검증
  @ApiBearerAuth('exjwtauthorization')
  @ApiBody({ schema: pukeSpito.puke })
  async redTen(@Body() data: any) {
    return await this.PukeService.redTen(data.groups)
  }

  @Post('/ershiyidian')
  @UseGuards(JwtAuthGuard) // 토큰검증
  @ApiBearerAuth('exjwtauthorization')
  @ApiBody({ schema: pukeSpito.puke })
  async ershiyidian(@Body() data: any) {
    return this.ErshiyidianService.ErshiyiDian(2)
  }
}
