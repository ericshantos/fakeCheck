const { createClient } = require("redis");

class CacheManager {
  constructor({ redisUrl = process.env.REDIS_URL || 'redis://redis:6379', logger = console}) {
    this.client = createClient({ url: redisUrl });
    this.connected = false;
    this.logger = logger;
  }

  async connect() {
    if (!this.connected) {
      try {
        await this.client.connect();
        this.connected = true;
        this.logger.info("Successfully connected to Redis");
      } catch (error) {
        this.logger.error('Redis connection failed: ' + error.message);
        throw error;
      }
    }
  }

  getClient() {
    if (!this.connected) {
      throw new Error('Redis is not connected. Call connect() first.');
    }
    return this.client;
  }

  async get(key) {
    await this.connect();
    return this.client.get(key);
  }

  async set(key, value, ttl = 3600) {
    await this.client.setEx(key, ttl, JSON.stringify(value));
  }

  async disconnect() {
    if (this.connected) {
      await this.client.disconnect();
      this.connected = false;
      this.logger.info('Disconnected from Redis');
    }
  }
}

module.exports = { CacheManager };
