import { Injectable, Inject } from "@nestjs/common";
import { LoggerContract } from "@ericshantos/logger";
import { LOGGER } from "@/shared/providers/tokens";
import { FREE_MEMORY, LOAD_AVG } from "@health/providers/token";
import * as os from "os";

interface InspectorResponse {
    status: string;
    message: string;
    metrics: {
        freeMemory: number,
        loadAvg: number
    }
}

@Injectable()
export class CheckSystemResources {
    constructor(
        @Inject(LOGGER) private readonly logger: LoggerContract,
        @Inject(FREE_MEMORY) private readonly freeMemory: number,
        @Inject(LOAD_AVG) private readonly loadAvg: number
    ) {}

    async run(): Promise<InspectorResponse> {
        let status = 'success';
        let message = 'System resources OK';
    
        if (this.freeMemory < 500) {
            status = 'error';
            message = `Low memory: ${this.freeMemory.toFixed(2)} MB free`;
            this.logger.error(`[SYSTEM CHECK] Low memory: ${this.freeMemory.toFixed(2)} MB`);
        } else if (this.loadAvg > os.cpus().length * 0.7) { 
            status = 'warning';
            message = `High CPU load: ${this.loadAvg.toFixed(2)}`;
            this.logger.warn(`[SYSTEM CHECK] High CPU load: ${this.loadAvg.toFixed(2)}`);
        }
    
        return { status, message, metrics: { freeMemory: this.freeMemory, loadAvg: this.loadAvg } };
    }
}

