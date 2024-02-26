import {
  CACHE_MANAGER,
  CacheModule as BaseCacheModule,
  Inject,
  Logger,
  Module,
  OnModuleInit
} from '@nestjs/common';
import * as redisStore from 'cache-manager-ioredis'
import { ZRedisService } from './z-redis.service';
import {createClient } from 'ioredis'
import { Cache } from 'cache-manager';
import { ZRedisController } from './z-redis.controller';
import { JwtService } from '@nestjs/jwt';
@Module({
  imports: [
    BaseCacheModule.registerAsync({
      useFactory: () => {
        return {
          store: redisStore,
          host: process.env.REDIS_HOST,
          port: process.env.REDIS_PORT,
          password: process.env.REDIS_PASSWORD,
          ttl: 60 * 3600 * 1000,
        }
      }
    }),
  ],
  controllers:[ZRedisController],
  providers: [
    ZRedisService,
    JwtService
  ],
  exports: [
    // BaseCacheModule,
    ZRedisService]
})
export class ZRedisModule implements OnModuleInit { 
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async onModuleInit() {
    try {
      // const redis = new createClient({
      //   host: process.env.REDIS_HOST,
      //   port: process.env.REDIS_PORT,
      //   password: process.env.REDIS_PASSWORD,
      // });
      // const info = await redis.info();
      // console.log('Redis server information:', info);

      console.log('Redis connection test successful!');
    } catch (error) {
      console.error('Redis connection test failed:', error);
    }
  }
}