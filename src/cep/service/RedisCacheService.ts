import { CacheRepository } from "../repository/CacheRepository";

class RedisCacheService {
  async save(key: string, value: unknown): Promise<void> {
    try {
      console.log(`Salvando dados para chave ${key}`);
      const cacheRepository = new CacheRepository()
      await cacheRepository.save(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Erro ao tentar salvar cache para chave ${key}`, error);
    }
  }

  async get(key: string): Promise<unknown | null> {
    try {
      const cacheRepository = new CacheRepository()
      const data = await cacheRepository.get(key);
      console.log(`Cache encontrado para chave ${key}`);
      return JSON.parse(data as string);
    } catch (error) {
      console.error(`Erro ao buscar cache para chave ${key}`, error);
      return null;
    }
  }

  async existsForKey(key: string): Promise<boolean> {
    try {
      const cacheRepository = new CacheRepository()
      const data = await cacheRepository.get(key);
      if (data) {
        console.log(`Cache existente para chave ${key}`);
        return true;
      }
    } catch (error) {
      console.error(`Erro ao consultar cache para chave ${key}`, error);
    }
    return false;
  }
}

export default new RedisCacheService();
