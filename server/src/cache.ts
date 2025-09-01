import { LRUCache } from "lru-cache";


const ttl = Number(process.env.CACHE_TTL_MS || 10 * 60 * 1000);

export const cache = new LRUCache<string, string>({
  max: 100,
  ttl: 1000 * 60 * 5, // 5 minutes
});