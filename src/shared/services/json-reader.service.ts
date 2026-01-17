import { Injectable, Inject, Logger } from "@nestjs/common";
import { READ_FILE } from "@shared/providers/tokens";
import { existsSync } from 'fs';
import * as path from 'path';

@Injectable()
export class JsonReader {
    private readonly rootDir: string = process.cwd();
    private readonly logger: Logger = new Logger(JsonReader.name);

    constructor(
        @Inject(READ_FILE) private readonly reader: (path: string, options: { encoding: string }) => Promise<string>
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

            this.logger.log(`Reading JSON file from: ${fullPath}`);

            const content = await this.reader(fullPath, { encoding: "utf-8" });
            const parsed = JSON.parse(content);

            this.logger.log(`Successfully parsed JSON from: ${fullPath}`);

            return parsed;

        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : String(err);
            this.logger.error(`Error reading JSON from ${file}: ${message}`);
            throw err;
        };
    };
};
