import { CACHE_SCHEDULER } from "../../config/secrets.js";
import { LocalCacheService } from "./LocaCacheService.js";
import schedule from "node-schedule";

// Função para remover chaves expiradas
export function removeExpiredKeys(): void {
  const localCacheService = new LocalCacheService()
  schedule.scheduleJob(CACHE_SCHEDULER, () => {
    localCacheService.removeExpiredKeys();
  });
}
