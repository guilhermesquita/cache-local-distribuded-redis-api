import { REDIS_HOST } from "../../config/secrets";
import { LocalCacheService } from "./LocaCacheService";

export class CacheServiceWrapper {
  async save(key: any, value: any) {
    if (REDIS_HOST) {
      return null;
    }
    const localServiceCache = new LocalCacheService();
    return localServiceCache.save(key, value);
  }
  async get(key: any) {
    if (REDIS_HOST) {
      // return await RedisCacheService.get(key);
    }
    const localServiceCache = new LocalCacheService();
    return localServiceCache.get(key);
  }

  async exists(key: any) {
    if (REDIS_HOST) {
        // return await RedisCacheService.existsForKey(key);
      }
      const localServiceCache = new LocalCacheService();
      return localServiceCache.existsForKey(key);
  }
}
