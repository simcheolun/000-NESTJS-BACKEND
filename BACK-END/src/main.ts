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

  app.register(fastifyCompress, {
    global: true,
    encodings: ['gzip', 'deflate'],
    threshold: 0,
  });


  // app.register(fastifyMultipart);
  app.register(fastifyMultipart, { limits: { fileSize: 60 * 1024 * 1024 } }); 

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 1234; // 환경변수나 기본 포트

  swaggerOptions(app)

  await app.listen(port, '0.0.0.0');
  console.log(`스웨이거API링크: ${await app.getUrl()}/${process.env[`SWAGGER_NAME`]}`);
}
startServe();


/*
APP.MODULE.TS
TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => typeOrmConfig('MASTER'),
      inject: [ConfigService],
    }),
    // 다중Database연결
    TypeOrmModule.forRootAsync({
      name: 'SLAVE', // 이름 지정
      useFactory: (configService: ConfigService) => typeOrmConfig('SLAVE'),
      inject: [ConfigService],
    }),

TABLE SERVICE
constructor(...){
@InjectRepository(AccountInfoEntitySlave, 'SLAVE')

}
*/