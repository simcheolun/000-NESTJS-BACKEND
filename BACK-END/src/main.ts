// main.ts
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import * as fastifyMultipart from 'fastify-multipart';
import { ConfigService } from '@nestjs/config';
import { swaggerOptions } from './swagger.config';
import fastifyCompress from '@fastify/compress';
import { join } from 'path';
import * as fastify from 'fastify';
import express from 'express';


async function startServe() {

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      logger: false,
    }),
    { cors: true },
  );

  const staticFolderPath = join(__dirname, '..', '..', 'upload');
  app.useStaticAssets({
    root: staticFolderPath,
    prefix: '/upload',
  })
  app.use(express.static(join(__dirname, '..','..', 'static')));

  app.register(fastifyCompress, {
    global: true,
    encodings: ['gzip', 'deflate'],
    threshold: 0,
  });

  app.register(fastifyMultipart, { limits: { fileSize: 60 * 1024 * 1024 } });

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 1234; // 환경변수나 기본 포트

  swaggerOptions(app)

  await app.listen(port, '0.0.0.0');
  console.log(`스웨이거API링크: ${await app.getUrl()}/${process.env[`SWAGGER_NAME`]}`);
}
startServe();

/* 스케쥴설정

npm install --save @nestjs/schedule

************app.module.ts
  ScheduleModule.forRoot(), //스케쥴
************ 서비스파일.ts
@Cron('* /1 * * * * *') // 초
async ecount() { 실행하는 코드 }
/*


레디스 열람
await getCachingData(this.ZRedisService, this.REDIS_KEY, this.GroupUserRepositorySlave)
레디스 설정
await redisService.setCaching(redisKey, cachingData)

슬레이브 설정 service.ts
@InjectRepository(엔티티, 'SLAVE')
private 리퍼지토리명칭: 리퍼지토리,

슬레이브 설정 repository.ts
@Injectable()
export class 리퍼지토리명칭 extends Repository<메인엔티티>{
    constructor(
        private dataSource: DataSource,
    ) {
        super(메인엔티티, dataSource.createEntityManager());
    }
    ... 각종함수
  }
@Injectable()
export class 리퍼지토리명칭 extends Repository<슬라이브엔티티>{
    constructor(
        private dataSource: DataSource,
    ) {
        super(슬라이브엔티티, dataSource.createEntityManager());
    }
    ... 함수필요없음
  }

*/