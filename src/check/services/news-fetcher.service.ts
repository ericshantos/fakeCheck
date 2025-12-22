import { Injectable, Inject } from "@nestjs/common";
import { LoggerContract } from "@ericshantos/logger";
import type { AxiosInstance } from "axios";
import { LOGGER } from "@/shared/providers/tokens";
import { HTTP_CLIENT } from "@check/providers/token";

@Injectable()
export class NewsFetcher {
    constructor(
        @Inject(LOGGER) private readonly logger: LoggerContract,
        @Inject(HTTP_CLIENT) private readonly httpClient: AxiosInstance
    ) {}

    async fetch(url: string): Promise<string> {
        try {
            this.logger.info(`Attempting to fetch news from URL: ${url}`);
            const response = await this.httpClient.get(url);
            this.logger.info(`Successfully fetched news from URL: ${url}`);
            return response.data;
        } catch (err) {
            this.logger.error(`Failed to fetch news from URL: ${url} - ${err.message}`);
            throw new Error(`Unable to fetch the news content: ${err.message}`);
        }
    }
}