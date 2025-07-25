import { InspectorResponse } from "../interfaces/response-inspector.interface";
import { Injectable, Inject } from "@nestjs/common";
import { AxiosInstance } from "axios";
import { LoggerContract } from "@ericshantos/logger";
import { LOGGER } from "@/shared/providers/tokens";
import { AXIOS_INSTANCE } from "@health/providers/token";

@Injectable()
export class CheckInternetConnection {

    constructor (
        @Inject(LOGGER) private readonly logger: LoggerContract,
        @Inject(AXIOS_INSTANCE) private readonly axios: AxiosInstance,
    ) {}

    async run(): Promise<InspectorResponse> {
        try {
            await this.axios.get('https://www.google.com', { timeout: 2000 })
            return { status: 'success', message: 'Internet connection established' };
        } catch(err: any) {
            this.logger.error(`[INTERNET CHECK] Failed to connect to the internet: ${err.message}`);
            return { status: 'error', message: 'No internet connection' };
        }
    }
}