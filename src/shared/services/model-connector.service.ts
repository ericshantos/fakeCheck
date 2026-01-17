import { Injectable, Inject, Logger } from "@nestjs/common";
import { WebSocket } from "ws";

import { 
    CONNECTOR_HOST, 
    CONNECTOR_PORT, 
    CONNECTOR_TIMEOUT 
} from "@shared/providers/tokens";

@Injectable()
export class PredictionRequester {
    private readonly logger: Logger = new Logger(PredictionRequester.name);

    constructor (
        @Inject(CONNECTOR_HOST) private readonly host: string,
        @Inject(CONNECTOR_PORT) private readonly port: number,
        @Inject(CONNECTOR_TIMEOUT) private readonly timeout: number, 
    ) {};

    async predict(text: string): Promise<number> {
        return new Promise<number>((resolve, reject) => {
            const ws = new WebSocket(`ws://${this.host}:${this.port}`);

            const timer = setTimeout(() => {
                ws.close();
                reject(new Error('Prediction request timed out'));
            }, this.timeout);

            ws.on('open', () => {
                this.logger.log('Connected to the WebSocket server');
                ws.send(JSON.stringify({ text }));
            });

            ws.on('message', (data) => {
                clearTimeout(timer);
                try {
                    const parsed = JSON.parse(data.toString());
                    resolve(parsed.prediction);
                } catch (err) {
                    reject(err);
                } finally {
                    ws.close();
                }
            });

            ws.on('error', (err) => {
                clearTimeout(timer);
                this.logger.error('WebSocket error');
                reject(err);
            });

            ws.on('close', () => {
                this.logger.log('WebSocket connection closed');
            });    
        });
    }
};