import { InspectorResponse } from "../interfaces/response-inspector.interface";
import { ExtractorContract } from "src/shared/interfaces";
import { Injectable, Inject } from "@nestjs/common";
import { LoggerContract } from "@ericshantos/logger";
import { LOGGER, EXTRACTOR } from "@shared/providers/tokens";

@Injectable()
export class CheckScraper {
    constructor(
        @Inject(LOGGER) private readonly logger: LoggerContract,
        @Inject(EXTRACTOR) private readonly extractor: ExtractorContract
    ) {}

    async run(): Promise<InspectorResponse> {
        const html = `
            <html>
                <body>
                    <h1>Test Title</h1>
                    <article>
                        <p>This is a test paragraph.</p>
                        <p>Another test paragraph.</p>
                    </article>
                </body>
            </html>
        `;

        try {
            const { title, articleText } = this.extractor.extract(html);

            if (title.includes('not found') || articleText.includes('not found')) {
                this.logger.warn(`[EXTRACTOR CHECK] Extraction returned incomplete content.`);
                return {
                    status: 'error',
                    message: 'Extractor failed to retrieve valid title or article text.'
                };
            }

            this.logger.info(`[EXTRACTOR CHECK] Extraction successful: title and text found.`);
            return {
                status: 'success',
                message: 'Extractor working correctly.'
            };

        } catch (err: any) {
            this.logger.error(`[EXTRACTOR CHECK] Unexpected error: ${err.message}`);
            return {
                status: 'error',
                message: 'Unexpected error during extractor execution.'
            };
        }
    }
}
