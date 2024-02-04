import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
export const typeOrmConfig = (name: string): TypeOrmModuleOptions => ({
  type: 'mysql',
  host: process.env[`DATABASE_HOST_${name.toUpperCase()}`],
  port: parseInt(process.env[`DATABASE_PORT_${name.toUpperCase()}`], 10),
  username: process.env[`DATABASE_USERNAME_${name.toUpperCase()}`],
  password: process.env[`DATABASE_PASSWORD_${name.toUpperCase()}`],
  database: process.env[`DATABASE_NAME_${name.toUpperCase()}`],
  synchronize: false,
  logging: true,
  extra: {
    supportBigNumbers: true,
    bigNumberStrings: false,
  },
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../migration/*{.ts,.js}'],
  subscribers: [__dirname + '/../subscriber/*{.ts,.js}'],
});

// export const typeOrmConfigAsync = async (configService: ConfigService): Promise<TypeOrmModuleOptions> => ({
//   type: 'mysql',
//   host: configService.get('DATABASE_HOST'),
//   port: configService.get<number>('DATABASE_PORT'),
//   username: configService.get('DATABASE_USERNAME'),
//   password: configService.get('DATABASE_PASSWORD'),
//   database: configService.get('DATABASE_NAME'),
//   synchronize: false,
//   logging: true,
//   extra: {
//     supportBigNumbers: true, // BIGINT > 숫자
//     bigNumberStrings: false, // BIGINT > 문자
//   },
//   entities: [__dirname + '/../**/*.entity{.ts,.js}'],
//   migrations: [__dirname + '/../migration/*{.ts,.js}'],
//   subscribers: [__dirname + '/../subscriber/*{.ts,.js}'],
// });

// export const TypeOrmConfigProvider = {
//   provide: 'TypeOrmConfig',
//   useFactory: typeOrmConfigAsync,
//   inject: [ConfigService],
// };