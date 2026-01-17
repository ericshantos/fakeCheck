import { Injectable, Inject, Logger } from "@nestjs/common";
import { SELECTORS, VALIDATION } from "@shared/providers/tokens";
import { HtmlValidator } from "@shared/dtos";
import { CheerioAPI, load } from "cheerio";

import { SelectorExtractor } from "@shared/contracts";
import { ObjectValidator } from "./validation.service";

@Injectable()
export class TextExtractor {
    private readonly logger: Logger = new Logger(TextExtractor.name);

    constructor (
        @Inject(SELECTORS) private readonly selectors: SelectorExtractor, 
        @Inject(VALIDATION) private readonly validator: ObjectValidator,
    ) {}

    private extractTitle($: CheerioAPI): string {
        try {
            if (!this.selectors.title) {
                this.logger.warn("No title selector configured");
                return "Title not found";
            }

            const titleElement = $(this.selectors.title).first();
            if (!titleElement.length) {
                this.logger.warn(`Title selector '${this.selectors.title}' not found in HTML`);
                return "Title not found";
            }

            const titleText = titleElement.text().trim();
            this.logger.log(`Extracted title: ${titleText}`);
            return titleText || "Title not found";
        } catch (err) {
            this.logger.error(`Error extracting title: ${err.message}`);
            return "Title extraction failed";
        };
    }

    private extractArticleText($: CheerioAPI): string {
        try {
            let text = '';
            
            if (this.selectors.paragraphs) {
                text = $(this.selectors.paragraphs)
                .map((_, el) => $(el).text().trim())
                .get()
                .join(" ")
                .trim();
            }

            if (!text) {
                this.logger.warn("Article text not found in selector, falling back to all <p> tags.");
                text = $("p")
                .map((_, el) => $(el).text().trim())
                .get()
                .join(" ")
                .trim();
            }

            this.logger[text ? "log" : "warn"](
                text ? "Article text extracted successfully." : "No article text found."
            );

            return text || "No article text found";
        } catch (err) {
            this.logger.error(`Error extracting article text: ${err.message}`);
            return "Article text extraction failed";
        };
    }

    public extract(html: string): { title: string, articleText: string } {
        try {
            this.validator.validate(HtmlValidator, { html });

            this.logger.log("Loading and parsing HTML content");
            const $ = load(html);

            this.logger.log("Extracting content from HTML");
            const title = this.extractTitle($);
            const articleText = this.extractArticleText($);

            this.logger.log("Content extraction completed");
            return { title, articleText };
        } catch (err) {
            this.logger.error(`Extraction failed: ${(err as Error).message}`);
            return {
                title: "Extraction failed",
                articleText: "Extraction failed"
            };
        };
    };
};