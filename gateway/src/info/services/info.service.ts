import { Injectable, Inject } from '@nestjs/common';
import { JSON_READER, LOGGER } from '@/shared/providers/tokens';
import { LoggerContract } from '@ericshantos/logger';
import { InfoResponse } from '@info/interfaces/info-response.interface';
import { JsonReaderContract } from '@shared/interfaces/json-reader.interface';

@Injectable()
export class InfoService {
    constructor(
        @Inject(LOGGER) private readonly logger: LoggerContract,
        @Inject(JSON_READER) private readonly reader: JsonReaderContract
    ) {}

    async run(): Promise<InfoResponse> {
        this.logger.info("Starting reading API and model information...");

        const defaults: InfoResponse = {
            version: 'unknown',
            framework: 'unknown',
            model_architecture: 'unknown',
            license: 'unknown'
        };
        
        try {
            const response = await this.reader.read<InfoResponse>('package.json');
            this.logger.info("Reading package.json completed");

            const result = Object.keys(defaults).reduce((acc, key) => {
                const fallbackStrategies = {
                    version: () => response.version || defaults.version,
                    framework: () => response.model_metadata?.framework || defaults.framework,
                    model_architecture: () => 
                        response.model_metadata?.model_architecture || defaults.model_architecture,
                    license: () => response.license || defaults.license
                };

                acc[key as keyof InfoResponse] = fallbackStrategies[key as keyof InfoResponse]();
                return acc;
            }, {} as InfoResponse);

            return result;
        } catch(err: any) {
            this.logger.error(`Error getting API/model information: ${err.message}`);
            return defaults;
        }
    }
}
