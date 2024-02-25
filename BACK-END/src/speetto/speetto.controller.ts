import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { SpeettoService } from './speetto.service';
import { CreateSpeettoDto } from './dto/create-speetto.dto';
import { UpdateSpeettoDto } from './dto/update-speetto.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/Auth/jwt-auth.guard';

@Controller('api')
export class SpeettoController {
  constructor(private readonly speettoService: SpeettoService) { }

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

}
