import { NestMiddleware, Injectable, Logger } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class DebugLoggerMiddleware implements NestMiddleware {
    constructor (private readonly configService: ConfigService) {}

    private readonly logger: Logger = new Logger(DebugLoggerMiddleware.name);
    private readonly timestamp = new Date().toISOString();

    use(req: Request, res: Response, next: NextFunction) {
        const debug = this.configService.get<boolean>("app.debug");
        const logging = this.configService.get<string>("app.logging") ?? "error";

        try {
            if (debug) {
                const { method, originalUrl, headers, body } = req;

                const logMessage = `[DEBUG] [${this.timestamp}] ${method} ${originalUrl}`;
                this.logger[logging](logMessage);

                if (logging === 'verbose') {
                    this.logger[logging](`[DEBUG] Headers: ${JSON.stringify(headers)}`);
                    this.logger[logging](`[DEBUG] Body: ${JSON.stringify(body)}`);
                }
            }
        } catch (err: any) {
            this.logger.error('[Logger Error]' + err);
        } finally {
            next();
        }
    }
}