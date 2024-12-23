import { __CONFIG__ } from "@/app/config";
import { Logging } from "@/logs";
import { createClient, RedisClientType } from "redis";


class CacheService {
    public cache: RedisClientType
    constructor() {
        Logging.dev("Redis Cache Enabled")
        this.cache = createClient({ url: __CONFIG__.CACHE.CACHE_HOST });
        this.ConnectRedisClient()
        this.cache = this.cache
    }
    /**
     * Connect to the Redis client.
     *
     * @private
     * @return {void}
     */
    private async ConnectRedisClient(): Promise<void> {
        await this.cache.connect().then(() => Logging.dev(`Redis Connected Successfully`)).catch((error: any) => Logging.error(`Error : ${error}`));
    }
    /**
     * Deletes the cache.
     *
     * @return {void} 
     */
    DeleteCache(): void {
        this.cache.flushAll();
    }

}
export const cacheServiceInstance = new CacheService();
