import { createClient, RedisClientType } from "redis";
import { TTL, REDIS_HOST } from "../../config/secrets.js";

const redisRepository: RedisClientType = createClient({
  url: `redis://${REDIS_HOST}`,
});

redisRepository.on("error", (error) => {
  console.error("Redis client error", error);
});

async function initializeRedis() {
  try {
    await redisRepository.connect();
    console.log("Conectado ao Redis com sucesso!");
  } catch (error) {
    console.error("Erro ao conectar ao Redis.", error);
  }
}

initializeRedis();

export class CacheRepository {
  async save(key: string, value: string): Promise<void> {
    try {
      await redisRepository.set(key, value, {
        EX: TTL,
      });
    } catch (error) {
      console.error("Erro ao tentar salvar dados no Redis.", error);
    }
  }

  async get(key: string): Promise<string | null> {
    try {
      return await redisRepository.get(key);
    } catch (error) {
      console.error("Erro ao tentar recuperar dados no Redis.", error);
      return null;
    }
  }
}