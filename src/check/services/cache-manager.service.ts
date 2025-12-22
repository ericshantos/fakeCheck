import { Injectable, Inject } from "@nestjs/common";
import { RedisClientType } from "redis";
import { CheckResponse } from "@check/interfaces";
import { LoggerContract } from "@ericshantos/logger";
import { LOGGER } from "@/shared/providers/tokens";
import { CLIENT } from "@check/providers/token";

@Injectable()
export class CacheManager {

  constructor(
    @Inject(LOGGER) private readonly logger: LoggerContract,
    @Inject(CLIENT) private readonly client: RedisClientType
  ) {}

  private connected: boolean = false;

  async get(key: string): Promise<CheckResponse | null> {
    const result = await this.client.get(key);
    return result ? JSON.parse(result) : null;
  }

  async set(key: string, value: CheckResponse, ttl = 3600): Promise<void> {
    const json = JSON.stringify(value);
    await this.client.setEx(key, ttl, json);
    this.logger.info(`SET ${key}: ${json} (TTL: ${ttl}s)`);
  }

  async disconnect(): Promise<void> {
    if (this.connected) {
      await this.client.disconnect();
      this.connected = false;
      this.logger.info('Disconnected from Redis');
    }
  }
}
