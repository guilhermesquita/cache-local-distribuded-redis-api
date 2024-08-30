import { TTL } from "../../config/secrets.js";

type CacheData = {
  value: any;
  expire: Date;
};

const CACHE = new Map<string, CacheData>();

export class LocalCacheService {
  save(key: string, value: any): void {
    try {
      if (!this.existsForKey(key)) {
        const data: CacheData = {
          value,
          expire: this.getExpiration(),
        };
        CACHE.set(key, data);
        console.info(`Salvando cache para chave ${key}`);
      }
    } catch (error) {
      console.error(`Erro ao tentar salvar cache para chave ${key}`);
      console.error(error);
    }
  }

  getExpiration(): Date {
    const expire = new Date();
    expire.setSeconds(expire.getSeconds() + TTL);
    return expire;
  }

  get(key: string): any | null {
    try {
      if (this.existsForKey(key)) {
        console.info(`Cache existente para chave ${key}`);
        const data = CACHE.get(key)?.value;
        console.info(`Retornando cache para chave ${key}`);
        return data;
      }
      console.error(`Cache não encontrado para chave ${key}`);
    } catch (error) {
      console.error(`Erro ao tentar encontrar cache para chave ${key}`);
      console.error(error);
    }
    return null;
  }

  existsForKey(key: string): boolean {
    const exists = CACHE.has(key);
    if (exists && this.isExpired(key)) {
      this.remove(key);
      return false;
    }
    return exists;
  }

  isExpired(key: string): boolean {
    const expire = CACHE.get(key)?.expire;
    return expire ? new Date() > expire : false;
  }

  remove(key: string): void {
    CACHE.delete(key);
  }

  removeExpiredKeys(): void {
    const expiredKeys = Array.from(CACHE.keys()).filter((key) => {
      return this.isExpired(key);
    });
    expiredKeys.forEach((key) => {
      this.remove(key);
    });
    console.info(`${expiredKeys.length} keys removed!`);
  }
}