import WebSocket from 'ws';
import { Injectable, Inject } from '@nestjs/common';
import { LoggerContract } from '@ericshantos/logger';
import { LOGGER, HOST, PORT, TIMEOUT } from '../providers/tokens';


@Injectable()
export class PredictionRequester {
  constructor(
    @Inject(LOGGER) private readonly logger: LoggerContract,
    @Inject(HOST) private readonly host: string,
    @Inject(PORT) private readonly port: number,
    @Inject(TIMEOUT) private readonly timeout: number
  ) {}

  async predict(text: string): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      const ws = new WebSocket(`ws://${this.host}:${this.port}`);

      const timer = setTimeout(() => {
        ws.close();
        reject(new Error('Prediction request timed out'));
      }, this.timeout);

      ws.on('open', () => {
        this.logger.info('Connected to the WebSocket server');
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
        this.logger.info('WebSocket connection closed');
      });
    });
  }
}
