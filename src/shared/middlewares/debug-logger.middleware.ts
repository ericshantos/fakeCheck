import { NestMiddleware, Injectable, Inject, Logger } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { LOGGER } from "@shared/providers/tokens";
import { LoggerContract } from "@ericshantos/logger";
import { AppConfig } from "@config/index";

@Injectable()
export class DebugLogger implements NestMiddleware {
    constructor(
        @Inject(LOGGER) private readonly logger: LoggerContract
    ) {}

    private readonly timestamp = new Date().toISOString();

    use(req: Request, res: Response, next: NextFunction) {
        try {
            if (AppConfig.debug) {
                const { method, originalUrl, headers, body } = req;

                const logMessage = `[DEBUG] [${this.timestamp}] ${method} ${originalUrl}`;
                this.logger[AppConfig.logging](logMessage);

                if (AppConfig.logging === 'verbose') {
                    this.logger[AppConfig.logging](`[DEBUG] Headers: ${JSON.stringify(headers)}`);
                    this.logger[AppConfig.logging](`[DEBUG] Body: ${JSON.stringify(body)}`);
                }
            }
        } catch (err: any) {
            this.logger.error('[Logger Error]' + err);
        } finally {
            next();
        }
    }
}