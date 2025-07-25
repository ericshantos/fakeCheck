import * as net from 'net';
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
    return new Promise((resolve, reject) => {
        const client = new net.Socket();
        let responseData = '';
        let settled = false;

        const cleanup = () => {
            if (!settled) {
                settled = true;
                if (!client.destroyed) {
                    client.destroy();
                }
            }
        };

        client.setTimeout(this.timeout);

        client.connect(this.port, this.host, () => {
            client.write(JSON.stringify({ text }) + '\n');
        });

        client.on('data', (data) => {
            responseData += data.toString();
            if (responseData.includes('\n')) {
                try {
                    const result = parseFloat(responseData.trim());
                    if (!isNaN(result)) {
                        resolve(result);
                    } else {
                        throw new Error('Invalid numeric response');
                    }
                    cleanup();
                } catch (err) {
                    reject(new Error('Failed to parse prediction response'));
                    cleanup();
                }
            }
        });

        client.on('error', (err) => {
            reject(new Error(`Connection error: ${err.message}`));
            cleanup();
        });

        client.on('timeout', () => {
            reject(new Error('Prediction timeout'));
            cleanup();
        });
    });
  }
}