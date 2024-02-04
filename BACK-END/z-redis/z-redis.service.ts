import {
    CACHE_MANAGER,
    CacheModule as BaseCacheModule,
    Inject,
    Logger,
    Module,
    OnModuleInit,
    Injectable
  } from '@nestjs/common';import { Cache } from 'cache-manager';
import { returnJSONSingle } from 'src/Auth/custom.function';
@Injectable()
export class ZRedisService  {
    constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {
    }
     async getCaching(key: string) {
        try {
            console.log('Z-REDIS.SERVICE.TS: get', key);
            const data = await this.cacheManager.get(key);
            return data;
        } catch (error) {
            console.error('Z-REDIS.SERVICE.TS: error while getting data', error);
            throw error;
        }
    }
    async setCaching(key: string, value: any) {
        console.log('Z-REDIS.SERVICE.TS: set',key)
        await this.cacheManager.set(key, value)
    }
    async delCaching(key: any) {
        await this.cacheManager.del(key)
        return returnJSONSingle({cachingKey:key},'요청이 반영되었습니다.','OK',200)
    }


}
