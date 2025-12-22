import { Injectable, Inject } from "@nestjs/common";
import { LOGGER, READER } from "@shared/providers/tokens";
import { LoggerContract } from "@ericshantos/logger";
import { FileReaderContract } from "../interfaces";
import { existsSync } from 'fs';
import path from 'path';

@Injectable()
export class JsonReader {
    private readonly rootDir: string = process.cwd();

    constructor(
        @Inject(LOGGER) private readonly logger: LoggerContract,
        @Inject(READER) private readonly reader: FileReaderContract
    ) {}

    private existsInJson(file: string): boolean {
        return existsSync(path.join(this.rootDir, file));
    }

    async read<T = any>(file: string): Promise<T> {
        const fullPath = path.join(this.rootDir, file);

        try {
            if (!this.existsInJson(file)) {
                throw new Error(`File "${file}" not found at path: ${fullPath}`);
            }

            this.logger.info(`Reading JSON file from: ${fullPath}`);

            const content = await this.reader(fullPath, { encoding: "utf-8" });
            const parsed = JSON.parse(content);

            this.logger.info(`Successfully parsed JSON from: ${fullPath}`);

            return parsed;

        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : String(err);
            this.logger.error(`Error reading JSON from ${file}: ${message}`);
            return {} as T;
        }
    }
}

