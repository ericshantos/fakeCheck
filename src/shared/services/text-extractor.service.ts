import { ObjectValidator } from "./validation.service";
import { LoggerContract } from "@ericshantos/logger";
import { Injectable, Inject } from "@nestjs/common";
import { HtmlValidator } from "../../check/dto";
import { load, CheerioAPI } from "cheerio";
import { LOGGER, SELECTORS, VALIDATION } from "../providers/tokens";

interface ExtractorSelectors {
    title?: string;
    paragraphs?: string;
}

@Injectable()
export class TextExtractor {
  
  constructor(
    @Inject(LOGGER) private readonly logger: LoggerContract,
    @Inject(SELECTORS) private readonly selectors: ExtractorSelectors,
    @Inject(VALIDATION) private readonly validation: ObjectValidator
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
      this.logger.info(`Extracted title: ${titleText}`);
      return titleText || "Title not found";
    } catch (err) {
      this.logger.error(`Error extracting title: ${err.message}`);
      return "Title extraction failed";
    }
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

      this.logger[text ? "info" : "warn"](
        text ? "Article text extracted successfully." : "No article text found."
      );

      return text || "No article text found";
    } catch (err) {
      this.logger.error(`Error extracting article text: ${err.message}`);
      return "Article text extraction failed";
    }
  }

  public extract(html: string): { title: string, articleText: string } {
    try {
      this.validation.validate(HtmlValidator, { html });

      this.logger.info("Loading and parsing HTML content");
      const $ = load(html);

      this.logger.info("Extracting content from HTML");
      const title = this.extractTitle($);
      const articleText = this.extractArticleText($);

      this.logger.info("Content extraction completed");
      return { title, articleText };
    } catch (err) {
      this.logger.error(`Extraction failed: ${err.message}`);
      return {
        title: "Extraction failed",
        articleText: "Extraction failed"
      };
    }
  }
}