import { Provider } from "@nestjs/common";
import { CLIENT } from "@check/providers/token";
import { createClient } from "redis";

export const CacheProvider: Provider[] = [{
    provide: CLIENT,
    useFactory: async () => {
        const redisUrl = process.env.REDIS_URL || 'redis://redis:6379';
        const client = createClient({ url: redisUrl });
        client.on('error', (err) => console.error('Redis Client Error', err));
        await client.connect();
        return client;
    }
}];